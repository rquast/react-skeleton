import { IConnection } from './connections';
import { OperationRequest } from './graphql';

export interface ISubscriptionEvent {
  event: string;
  payload: any;
}

export interface ISubscriber {
  event: string;
  connection: IConnection;
  operation: OperationRequest;
  operationId: string;
}

export interface ISubscriptionManager {
  /**
   * Fetches all subscribers that listens to given event name and returns paged iterator
   *
   * @param name
   */
  subscribersByEventName(name: string): AsyncIterable<ISubscriber[]>;

  /**
   * Subscribes to events
   *
   * @param names event names
   * @param connection
   * @param operation
   */
  subscribe(
    names: string[],
    connection: IConnection,
    operation: OperationRequest & { operationId: string }
  ): Promise<any>;

  /**
   * Unsubscribes from subscription
   *
   * @param subscriber
   */
  unsubscribe(subscriber: ISubscriber): Promise<any>;

  /**
   * Unsubscribes all subscriptions by connection id
   *
   * @param subscriber
   */
  unsubscribeAllByConnectionId(connectionId: string): Promise<any>;
}
