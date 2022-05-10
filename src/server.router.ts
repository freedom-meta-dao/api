import type {NextFunction, RequestHandler} from 'express-serve-static-core';

import type {ApiLambdaRequest} from './api/lambda/request';
import type {ApiLambdaResponse} from './api/lambda/response';
import {ApiLambdaSession} from './api/lambda/session';
import type {Application} from 'express';
import {Dynamo} from './dynamo';
import {Log} from '@toreda/log';
import ModuleRouter from './module.router';

export class ServerRouter {
	public readonly express: Application;
	public readonly log: Log;

	constructor(express: Application, ddb: Dynamo, session: ApiLambdaSession, log: Log) {
		this.express = express;
		this.log = log;

		// Call last after class members are set.
		this.prepareRequest(express, ddb, session, log);
	}

	/**
	 * Prepare request to be called.
	 * @param express
	 * @param session
	 * @param log
	 */
	public prepareRequest(express: Application, ddb: Dynamo, session: ApiLambdaSession, log: Log): void {
		// Middleware called per request to enable CORS.
		this.setupCORS(express);
		// Add the DynamoDB Wrappper connection.
		this.injectHelpers(express, ddb, session, log);
		// NOTE: router setup MUST BE LAST.
		// Routes to matching features route then sends response. Does not
		// pass on to any further middleware.
		this.setupRouters(express);
	}

	/**
	 * Inject log, and session values into request for later use by routers & functions.
	 * @param express			Express instance for request
	 * @param session			Session including user details
	 * @param log				Log instance to be used
	 */
	public injectHelpers(express: Application, ddb: Dynamo, session: ApiLambdaSession, log: Log): void {
		const middleware: RequestHandler = (
			req: ApiLambdaRequest,
			_res: ApiLambdaResponse,
			next: NextFunction
		) => {
			req.log = log;
			req.session = session;
			req.ddb = ddb;
			next();
		};

		express.use(middleware);
	}

	/**
	 * CORS must be setup here to enable. API Gateway CORS settings have no
	 * effect when using a Lambda API Proxy integration.
	 * @param express			Express instance for request
	 */
	public setupCORS(express: Application): void {
		const middleware: RequestHandler = (
			_req: ApiLambdaRequest,
			res: ApiLambdaResponse,
			next: NextFunction
		) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', '*');
			res.setHeader('Access-Control-Allow-Headers', '*');
			next();
		};

		express.use(middleware);
	}

	/**
	 * Setup routers and determine the order paths are handled.
	 * @param express 			Express instance for request
	 */
	public setupRouters(express: Application): void {
		// The latest API version should always be first. API versions are
		// different from app version, but support specific app versions.
		express.use('/v1.0', ModuleRouter);

		// Fallback route when URI does not match an existing route.
		const middleware: RequestHandler = (
			_req: ApiLambdaRequest,
			res: ApiLambdaResponse,
			_next: NextFunction
		) => {
			res.status(404);
			res.setHeader('x-freedom-error', 'page dne');
			res.json({page: 'fallback'});
		};

		express.use('/', middleware);
	}
}
