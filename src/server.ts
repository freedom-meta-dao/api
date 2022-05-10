import {ApiLambdaSession} from './api/lambda/session';
import {Application} from 'express-serve-static-core';
import {Dynamo} from './dynamo';
import {Log} from '@toreda/log';
import {ServerRouter} from './server.router';

export class Server {
	public readonly express: Application;
	public readonly router: ServerRouter;
	public readonly ddb: Dynamo;
	public readonly log: Log;

	constructor(express: Application, ddb: Dynamo, session: ApiLambdaSession, log: Log) {
		if (!express) {
			throw new Error('Failed server init - express instance missing.');
		}

		this.log = log;
		this.ddb = ddb;
		this.express = express;

		this.router = new ServerRouter(this.express, ddb, session, log);
	}

	public nop(): boolean {
		return true;
	}
}
