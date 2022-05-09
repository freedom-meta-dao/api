import type {DynamoExpressionAttributes} from '../expression/attributes';

/**
 * DynamoDB Wrapper argument for queries.
 *
 * @category DynamoDB
 */
export interface DynamoSearchGsi {
	indexName?: string;
	// Example: 'region = :region'
	keyConditionExpression: string;
	// Array of macros mapped to values,
	// e.g. ':region': 'us-west-2'
	expressionAttributes: DynamoExpressionAttributes[];
}
