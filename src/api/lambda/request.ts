import {ApiLambdaSession} from './session';
import {Log} from '@toreda/log';
import type {Request} from 'express-serve-static-core';
/**
 * Extension of Express Request instance with access
 * to logging, DynamoDB, and the user's session.
 * IMPORTANT: Replace all usage of the Express type
 * `Request` type with `APILambdaRequest`.
 *
 * @category API
 */
export interface ApiLambdaRequest extends Request {
	/** User info parsed from user JWT submitted with request. */
	session: ApiLambdaSession;
	/** DynamoDB wrapper instance for all DynamoDB operations. */
	/** Configurable log useful for debugging. */
	log: Log;
}
