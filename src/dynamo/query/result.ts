import {DynamoDB} from 'aws-sdk';

/**
 * Result data format for DynamoDB Wrapper queries.
 *
 * @category DDB
 */
export interface DynamoQueryResult<ItemT> {
	consumedCapacity: DynamoDB.ConsumedCapacity | null;
	count: number;
	items: DynamoDB.ItemList | ItemT[];
	scannedCount: number;
}
