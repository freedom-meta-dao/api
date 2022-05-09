import type {
	DynamoDeleteRequest,
	DynamoDeleteResult,
	DynamoGetResult,
	DynamoPutResult,
	DynamoUpdateResult
} from './dynamo/aliases';

import {DynamoDB} from 'aws-sdk';
import type {DynamoQueryResult} from './dynamo/query/result';
import type {DynamoSearchGsi} from './dynamo/search/gsi';
import {Log} from '@toreda/log';

/**
 * Wrapper class for DynamoDB. Providers helpers and convenience methods performing common
 * functionality.
 *
 * @category DynamoDB
 */
export class Dynamo {
	public readonly log: Log;

	constructor(log: Log) {
		if (!log) {
			throw new Error(`Dynamo init failure - log arg is missing.`);
		}

		this.log = log.makeLog('ddb');
	}

	/**
	 * Update existing DynamoDB Item identified by target key.
	 * @param tbl			Table containing
	 * @param keyName
	 * @param key
	 * @param item
	 * @returns
	 */
	public async update<DataT>(
		tbl: string,
		keyName: string,
		keyValue: string,
		item: DataT
	): Promise<DynamoUpdateResult | null> {
		const client = new DynamoDB.DocumentClient();
		const params = {
			TableName: tbl,
			Key: {
				[keyName]: keyValue
			},
			Item: {
				...item
			}
		};

		return client.update(params).promise();
	}

	public async insert<DataT>(table: string, id: string, item: DataT): Promise<DynamoPutResult | null> {
		const client = new DynamoDB.DocumentClient();
		const params = {
			TableName: table,
			Item: {
				id: id,
				...item
			}
		};
		return client.put(params).promise();
	}

	/**
	 * Retrieve record from DynamoDB table using provided key and return it as type ModelT or
	 * null if record does not exist.
	 * @param tbl			DynamoDB table name
	 * @param keyName 		Key field name to match against
	 * @param keyValue		Value for key
	 * @returns				Matching record cast as type ModelT, or null
	 * 						when no record is found.
	 */
	public async getRecord<ModelT>(tbl: string, keyName: string, keyValue: string): Promise<ModelT | null> {
		const data = await this.getKey(tbl, keyName, keyValue);
		// No matching records found.
		if (!data || !data.Item) {
			return null;
		}

		return data.Item as ModelT;
	}

	/**
	 * Convenience method to get record by predefined `id` field.
	 * @param tbl 			Dynamo Table Name to retrieve record from.
	 * @param id			ID for record to retrieve from target tbl.
	 * @returns
	 */
	public async getId(tbl: string, id: string): Promise<DynamoGetResult | null> {
		return this.getKey(tbl, 'id', id);
	}

	public async getKey(tbl: string, keyName: string, keyValue: string): Promise<DynamoGetResult | null> {
		const client = new DynamoDB.DocumentClient();
		const params = {
			TableName: tbl,
			Key: {
				[keyName]: keyValue
			}
		};

		return client.get(params).promise();
	}

	public async queryByKey<DataT>(
		tbl: string,
		search: DynamoSearchGsi
	): Promise<DynamoQueryResult<DataT> | null> {
		const client = new DynamoDB.DocumentClient();
		const params = {
			TableName: tbl,
			KeyConditionExpression: search.keyConditionExpression,
			ExpressionAttributeValues: {}
		};

		for (const attr of search.expressionAttributes) {
			params.ExpressionAttributeValues[attr.key] = attr.value;
		}

		const res = await client.query(params).promise();
		return this.createQueryResult(res);
	}

	/**
	 * Query target table using provided Global Secondary Index.
	 * @param tbl			Target DynamoDB table name
	 * @param search
	 */
	public async getByIndex<DataT>(
		tbl: string,
		search: DynamoSearchGsi
	): Promise<DynamoQueryResult<DataT> | null> {
		const client = new DynamoDB.DocumentClient();
		const params = {
			TableName: tbl,
			IndexName: search.indexName,
			KeyConditionExpression: search.keyConditionExpression,
			ExpressionAttributeValues: {}
		};

		// Map and insert expression attributes into params.
		for (const attr of search.expressionAttributes) {
			params.ExpressionAttributeValues[attr.key] = attr.value;
		}

		const res = await client.query(params).promise();
		return this.createQueryResult(res);
	}

	/**
	 * Parse DynamoDB query response and returns Query Result object or
	 * null if response is missing or invalid.
	 * @param res 		Scan Output response to parse from DynamoDB.
	 */
	public createQueryResult<DataT>(res?: AWS.DynamoDB.ScanOutput): DynamoQueryResult<DataT> | null {
		if (!res) {
			return null;
		}

		return {
			count: typeof res.Count === 'number' ? res.Count : 0,
			scannedCount: typeof res.ScannedCount === 'number' ? res.ScannedCount : 0,
			consumedCapacity: res.ConsumedCapacity ? res.ConsumedCapacity : null,
			items: res.Items ? res.Items : []
		};
	}

	/**
	 * Get record from target table using field 'hashKey'.
	 * @param tbl
	 * @param hashKey
	 * @returns
	 */
	public async getHashKey(tbl: string, hashKey: string): Promise<DynamoGetResult | null> {
		return this.getKey(tbl, 'HashKey', hashKey);
	}

	public async deleteKey(tbl: string, keyName: string, keyValue: string): Promise<DynamoDeleteResult> {
		return new Promise((resolve, reject) => {
			const client = new DynamoDB.DocumentClient();
			const params: DynamoDeleteRequest = {
				TableName: tbl,
				Key: {
					S: {
						[keyName]: keyValue
					}
				}
			};

			client.delete(params, (err, data) => {
				if (err) {
					return reject(err);
				}

				return resolve(data);
			});
		});
	}
}
