import { ulid } from 'ulid';
import { Server as WSServer } from 'ws';
import { createWsHandler, APIGatewayV2Handler, PubSub } from '../';
import createSchema from './schema';
import createMemoryEventProcessor, {
  EventProcessorFn
} from '../createMemoryEventProcessor';
import MemoryEventStore from '../MemoryEventStore';
import MemorySubscriptionManager from '../MemorySubscriptionManager';
import WebSocketConnectionManager from '../WebSocketConnectionManager';

class TestLambdaServer {
  connectionManager: WebSocketConnectionManager;
  eventStore: MemoryEventStore;
  subscriptionManager: MemorySubscriptionManager;
  eventProcessor: EventProcessorFn;
  eventProcessingInterval: NodeJS.Timer;
  handler: APIGatewayV2Handler;
  port: number;
  wsServer: WSServer;

  constructor({ port = 3001 }: { port?: number } = {}) {
    this.eventStore = new MemoryEventStore();
    this.port = port;

    const schema = createSchema({
      pubSub: new PubSub({ eventStore: this.eventStore })
    });

    this.connectionManager = new WebSocketConnectionManager();
    this.subscriptionManager = new MemorySubscriptionManager();
    this.handler = createWsHandler({
      schema,
      connectionManager: this.connectionManager,
      subscriptionManager: this.subscriptionManager
    });
    this.eventProcessor = createMemoryEventProcessor({
      schema,
      connectionManager: this.connectionManager,
      subscriptionManager: this.subscriptionManager
    });
  }

  close = async () => {
    const wsClose = new Promise((resolve, reject) => {
      this.wsServer.close(err => {
        clearInterval(this.eventProcessingInterval);

        return err ? reject(err) : resolve();
      });
    });

    return wsClose;
  };

  processEvents = () => {
    const events = this.eventStore.events.splice(0, 5);

    if (events) {
      this.eventProcessor(events);
    }
  };

  start = async () => {
    const wsStart = new Promise((resolve, reject) => {
      this.wsServer = new WSServer({ port: this.port });

      this.wsServer.on('connection', async ws => {
        const connectionId = ulid();
        const result = await this.handler(
          {
            requestContext: {
              connectionId,
              routeKey: '$connect',
              socket: ws
            }
          } as any,
          {} as any
        );

        ws.on('close', () => {
          this.handler(
            {
              requestContext: {
                connectionId,
                routeKey: '$disconnect',
                socket: ws
              }
            } as any,
            {} as any
          );
        });

        ws.on('message', async data => {
          const result = await this.handler(
            {
              requestContext: {
                connectionId,
                routeKey: '$default',
                socket: ws
              },
              body: data.toString('utf8')
            } as any,
            {} as any
          );

          if (result) {
            ws.send(result.body);
          }
        });

        if (result && result.statusCode === 403) {
          ws.send(result.body);

          ws.close();
          return;
        }

        if (result) {
          const conn = this.connectionManager.connections.get(connectionId);

          if (conn) {
            conn.socket = ws as any;
          }

          ws.send(result.body);
        }
      });

      this.wsServer.on('listening', () => {
        // start event processing
        this.eventProcessingInterval = setInterval(this.processEvents, 20);
        this.wsServer.removeListener('error', reject);
        resolve();
      });

      this.wsServer.on('error', reject);
    });

    return wsStart;
  };
}

export { TestLambdaServer };
