import {DynamoDB} from 'aws-sdk';

/**
 * Alias for DynamoDB Update Item request parameters
 *
 * @category DynamoDB
 */
export type DynamoUpdateRequest = DynamoDB.DocumentClient.UpdateItemInput;
/**
 * Alias for DynamoDB Update Item response
 *
 * @category DynamoDB
 */
export type DynamoUpdateResult = DynamoDB.DocumentClient.UpdateItemOutput;
/**
 * Alias for DynamoDB Put Item response
 *
 * @category DynamoDB
 * */
export type DynamoPutResult = DynamoDB.DocumentClient.PutItemOutput;
/**
 * Alias for DynamoDB Put Item request parameters
 *
 * @cateogry DynamoDB
 * */
export type DynamoPutRequest = DynamoDB.DocumentClient.PutItemInput;
/**
 * Alias for DynamoDB Get matching record response
 *
 * @category DynamoDB
 * */
export type DynamoGetResult = DynamoDB.DocumentClient.GetItemOutput;
/**
 * Alias for DynamoDB get matching record operation request parameters
 *
 * @category DynamoDB
 * */
export type DynamoGetRequest = DynamoDB.DocumentClient.GetItemInput;
/**
 * Alias for DynamoDB delete operation result.
 *
 * @category DynamoDB
 * */
export type DynamoDeleteResult = DynamoDB.DocumentClient.DeleteItemOutput;

/**
 * Type Alias for DynamoDB delete matching records operation request parameters.
 *
 * @category DynamoDB
 */
export type DynamoDeleteRequest = DynamoDB.DocumentClient.DeleteItemInput;
