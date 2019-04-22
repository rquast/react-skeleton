import { DynamoDB } from 'aws-sdk';
import {
  IConnection,
  ISubscriber,
  ISubscriptionManager,
  OperationRequest
} from './types';
import { valueFromASTUntyped } from 'graphql';

// polyfill Symbol.asyncIterator
if (Symbol['asyncIterator'] === undefined) {
  (Symbol as any)['asyncIterator'] = Symbol.for('asyncIterator');
}

interface DynamoDBSubscriber extends ISubscriber {
  /**
   * works as range key in DynamoDb (event is partition key)
   * it is in format connectionId:operationId
   */
  subscriptionId: string;
}

type Options = {
  subscriptionsTableName?: string;
};

class DynamoDBSubscriptionManager implements ISubscriptionManager {
  private tableName: string;
  private db: DynamoDB.DocumentClient;

  constructor({ subscriptionsTableName = 'Subscriptions' }: Options = {}) {
    this.tableName = subscriptionsTableName;
    this.db = new DynamoDB.DocumentClient();
  }

  subscribersByEventName = (
    name: string
  ): AsyncIterable<ISubscriber[]> & AsyncIterator<ISubscriber[]> => {
    let ExclusiveStartKey: DynamoDB.DocumentClient.Key | undefined;
    let done = false;

    return {
      next: async () => {
        if (done) {
          return { value: undefined, done: true };
        }

        const result = await this.db
          .query({
            ExclusiveStartKey,
            TableName: this.tableName,
            Limit: 50,
            KeyConditionExpression: 'event = :event',
            ExpressionAttributeValues: {
              ':event': name
            }
          })
          .promise();

        ExclusiveStartKey = result.LastEvaluatedKey;

        if (ExclusiveStartKey == null) {
          done = true;
        }

        // we store connectionData on subscription too so we don't
        // need to load data from connections table
        const value = result.Items as DynamoDBSubscriber[];

        return { value, done: value.length === 0 };
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  };

  subscribe = async (
    names: string[],
    connection: IConnection,
    operation: OperationRequest & { operationId: string }
  ): Promise<void> => {
    await this.db
      .batchWrite({
        RequestItems: {
          [this.tableName]: names.map(name => ({
            PutRequest: {
              Item: {
                connection,
                operation,
                event: name,
                subscriptionId: `${connection.id}:${operation.operationId}`,
                operationId: operation.operationId
              } as DynamoDBSubscriber
            }
          }))
        }
      })
      .promise();
  };

  unsubscribe = async (subscriber: ISubscriber) => {
    await this.db
      .delete({
        TableName: this.tableName,
        Key: {
          event: subscriber.event,
          subscriptionId: `${subscriber.connection.id}:${
            subscriber.operationId
          }`
        }
      })
      .promise();
  };

  unsubscribeAllByConnectionId = async (connectionId: string) => {
    console.log(`Removing all subscriptions from ${connectionId}`);

    // @ts-ignore
    const { Items } = await this.db.scan({
      TableName: this.tableName,
      FilterExpression: 'connection.id = :connection_id',
      ExpressionAttributeValues: { ':connection_id': connectionId }
    });

    console.log(`Removing ${JSON.stringify(Items)}`);

    await Promise.all(
      Items.map(item =>
        this.db.delete({
          TableName: this.tableName,
          Key: {
            event: item.event,
            subscriptionId: item.subscriptionId
          }
        })
      )
    );
  };
}

export { DynamoDBSubscriptionManager };
export default DynamoDBSubscriptionManager;
