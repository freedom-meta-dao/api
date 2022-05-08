import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import {Levels, Log} from '@toreda/log';

import {ApiLambdaSession} from './api/lambda/session';
import {Server} from './server';
import express from 'express';
import serverlessHTTP from 'serverless-http';

/**
 * Main handler in the serverless package pushed to AWS Lambda.
 * @param event			Event created in AWS Gateway API. Passed to this handler
 * 						through a route configured with a LambdaProxy for this
 * 						handler.
 * @param context
 * @returns
 */
export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<unknown> {
	const log = new Log({
		globalLevel: Levels.ALL
	});
	log.info('main handler ----->');
	const session = new ApiLambdaSession(event);
	const instance = express();
	const _server = new Server(instance, session, log);

	const wrapped = serverlessHTTP(instance);
	const result = await wrapped(event, context);

	log.info('main handler execution finished');

	return result;
}
