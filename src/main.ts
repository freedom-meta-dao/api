import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import {Levels, Log} from '@toreda/log';

import {ApiLambdaSession} from './api/lambda/session';
import {Dynamo} from './dynamo';
import {Server} from './server';
import express from 'express';
import serverlessHTTP from 'serverless-http';

let log: Log;
let ddb: Dynamo;

try {
	log = new Log({
		globalLevel: Levels.ALL,
		consoleEnabled: true
	});
	ddb = new Dynamo(log);
} catch (e) {
	console.error(`bad log/ddb init: ${e.message}.`);
}
/**
 * Main handler in the serverless package pushed to AWS Lambda.
 * @param event			Event created in AWS Gateway API. Passed to this handler
 * 						through a route configured with a LambdaProxy for this
 * 						handler.
 * @param context
 * @returns
 */

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<unknown> {
	try {
		console.info('main handler ----->');
		const session = new ApiLambdaSession(event);
		const instance = express();
		const server = new Server(instance, ddb, session, log);
		server.nop();
		const httpHandler = serverlessHTTP(instance);
		const result = await httpHandler(event, context);

		console.info('main handler execution finished');

		return result;
	} catch (e) {
		console.error(`main.handler exception: ${e.message}.`);
	}

	return null;
}
