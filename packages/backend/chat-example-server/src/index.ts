import { APIGatewayEvent, DynamoDBStreamEvent } from 'aws-lambda';
import {
  APIGatewayWebSocketEvent,
  createDynamoDBEventProcessor,
  createHttpHandler,
  createWsHandler,
  DynamoDBConnectionManager,
  DynamoDBEventStore,
  DynamoDBSubscriptionManager,
  PubSub,
  withFilter
} from '@react-serverless-skeleton/aws-lambda-graphql';
import * as assert from 'assert';
import { makeExecutableSchema } from 'graphql-tools';
import { ulid } from 'ulid';

const eventStore = new DynamoDBEventStore();
const pubSub = new PubSub({ eventStore });

type MessageType = 'greeting' | 'test';

type Message = {
  id: string;
  text: string;
  type: MessageType;
};

type SendMessageArgs = {
  text: string;
  type: MessageType;
};

const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    enum MessageType {
      greeting
      test
    }

    type Message {
      id: ID!
      text: String!
      type: MessageType!
    }

    type Mutation {
      sendMessage(text: String!, type: MessageType = greeting): Message!
      
    }

    type Query {
      serverTime: Float!
    }

    type Subscription {
      messageFeed(type: MessageType): Message!
    }
  `,
  resolvers: {
    Mutation: {
      async sendMessage(rootValue: any, { text, type }: SendMessageArgs) {
        assert.ok(text.length > 0 && text.length < 100);
        const payload: Message = { id: ulid(), text, type };

        await pubSub.publish('NEW_MESSAGE', payload);

        return payload;
      }
    },
    Query: {
      serverTime: () => Date.now()
    },
    Subscription: {
      messageFeed: {
        resolve: (rootValue: Message) => {
          // root value is the payload from sendMessage mutation
          return rootValue;
        },
        subscribe: withFilter(
          pubSub.subscribe('NEW_MESSAGE'),
          (rootValue: Message, args: { type: null | MessageType }) => {
            // this can be async too :)
            if (args.type == null) {
              return true;
            }

            return args.type === rootValue.type;
          }
        )
      }
    }
  }
});

const connectionManager = new DynamoDBConnectionManager();
const subscriptionManager = new DynamoDBSubscriptionManager();

const eventProcessor = createDynamoDBEventProcessor({
  connectionManager,
  schema,
  subscriptionManager
});
const wsHandler = createWsHandler({
  connectionManager,
  schema,
  subscriptionManager
});
const httpHandler = createHttpHandler({
  connectionManager,
  schema
});

export async function handler(
  event: APIGatewayEvent | APIGatewayWebSocketEvent | DynamoDBStreamEvent,
  context
) {
  console.log('received event', JSON.stringify(event, null, '  '));
  // detect event type
  if ((event as DynamoDBStreamEvent).Records != null) {
    // event is DynamoDB stream event
    return eventProcessor(event as DynamoDBStreamEvent, context, null as any);
  } else if (
    (event as APIGatewayWebSocketEvent).requestContext != null &&
    (event as APIGatewayWebSocketEvent).requestContext.routeKey != null
  ) {
    // event is web socket event from api gateway v2
    return wsHandler(event as APIGatewayWebSocketEvent, context);
  } else if (
    (event as APIGatewayEvent).requestContext != null &&
    (event as APIGatewayEvent).requestContext.path != null
  ) {
    // event is http event from api gateway v1
    return httpHandler(event as APIGatewayEvent, context, null as any);
  } else {
    throw new Error('Invalid event');
  }
}
