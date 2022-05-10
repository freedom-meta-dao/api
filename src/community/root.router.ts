import express, {Router} from 'express';

import {ApiLambdaRequest} from '../api/lambda/request';
import {ApiLambdaResponse} from '../api/lambda/response';
import {Datastore} from '../datastore';
import {Levels} from '@toreda/log';
import {errorMkCode} from '@toreda/chk';
import {idMake} from '@toreda/strong-types';

const router: Router = Router();
const datastore = new Datastore();

router.use(express.json());

router.get('/browse/:pageNum', async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	const pageNum = idMake('__', String(req.params.pageNum));

	res.statusCode = 200;
	res.json({
		page: `/community/list/${pageNum()}`
	});
});

router.get('/browse', async (_req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	res.statusCode = 200;
	res.json({
		page: `/communities/browse`
	});
});

/**
 * View community with target id
 */
router.get('/:communityId/view', async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	const log = req.log.makeLog(`/:communityId/view`);

	log.activateDefaultConsole(Levels.ALL);
	log.debug('[router__init]/:communityId/view/');

	try {
		const communityId = idMake('__', req.params.communityId.toString());

		if (communityId() === '__') {
			log.error(`bad communityId arg`);
			res['x-dao-error-msg'] = errorMkCode('missing', 'communityId', 'arg');
			res.statusCode = 400;
			return res;
		}

		log.debug(`getCommunityData__before`);
		const comm = await datastore.getCommunityData(req.ddb, communityId());
		if (!comm || !comm.success()) {
			log.error(`bad community fetch: ${comm.errorCode()}.`);
			res['x-dao-error-msg'] = errorMkCode('no_match_found', 'community', 'record');
			res.statusCode = 404;
			log.debug('getCommunityData__drop');
			return;
		}

		log.debug(`getCommunityData__after`);

		if (!comm.data) {
			res['x-dao-error-msg'] = errorMkCode('bad_data', 'community', 'record');
			res.statusCode = 404;
			return res;
		}

		res.statusCode = 200;
		res.json(comm.data);
	} catch (e) {
		log.error(`[router__exception]: ${e.message}`);
		res['x-dao-error-msg'] = e.message;
		res.statusCode = 501;
	}

});

router.post(
	'/:communityId/proposal/:proposalId/save',
	async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
		const proposalId = idMake('__', String(req.params.proposalId));
		const communityId = idMake('__', String(req.params.communityId));

		if (proposalId() === '__' || communityId() === '__') {
			res.statusCode = 400;
			return;
		}

		res.statusCode = 202;
		res.json({
			page: `/community/${communityId()}/proposal/${proposalId()}/save`
		});

		return res;
	}
);

router.post('/:communityId/proposal/create', async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	const communityId = idMake('__', String(req.params.communityId));

	if (communityId() === '__') {
		res.statusCode = 400;
		return;
	}

	res.statusCode = 200;
	res.json({
		page: `/community/${communityId()}/proposal/create`
	});

	return res;
});

router.get(
	'/:communityId/proposal/view/:proposalId',
	async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
		const proposalId = idMake('__', String(req.params.proposalId));
		const communityId = idMake('__', String(req.params.communityId));

		if (proposalId() === '__' || communityId() === '__') {
			res.statusCode = 400;
			return;
		}

		res.statusCode = 200;
		res.json({
			page: `/community/${communityId()}/proposal/view/${proposalId()}`
		});

		return res;
	}
);

export default router;
