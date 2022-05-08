import {ApiLambdaSession} from './api/lambda/session';
import {Application} from 'express-serve-static-core';
import {Log} from '@toreda/log';
import {ServerRouter} from './server.router';

export class Server {
	public readonly express: Application;
	public readonly router: ServerRouter;
	public readonly log: Log;

	constructor(express: Application, session: ApiLambdaSession, log: Log) {
		if (!express) {
			throw new Error('Failed server init - express instance missing.');
		}

		this.log = log;
		this.express = express;

		this.router = new ServerRouter(this.express, session, log);
	}

	public nop(): boolean {
		return true;
	}
}
