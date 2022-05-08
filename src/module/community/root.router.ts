import express, {Router} from 'express';

import {ApiLambdaRequest} from '../../api/lambda/request';
import {ApiLambdaResponse} from '../../api/lambda/response';
import {uIntMake} from '@toreda/strong-types';

const router: Router = Router();
router.use(express.json());
router.get('/browse/:pageNum', async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	const pageNum = uIntMake(0, Number(req.params.pageNum));

	res.json({
		page: `/community/list/${pageNum()}`
	});
});

router.get('/browse', async (_req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	res.json({
		page: `/communities/browse`
	});
});

/**
 * View community with target id
 */
router.get('/:communityId/view', async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	const communityId = uIntMake(0, Number(req.params.communityId));

	res.json({
		page: `/community/${communityId()}/view`
	});
});

router.post('/:communityId/proposal/:id/save', async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	const id = uIntMake(0, Number(req.params.id));
	const communityId = uIntMake(0, Number(req.params.communityId));

	res.json({
		page: `/community/${communityId()}/proposal/${id()}/save`
	});
});

router.post('/:communityId/proposal/create', async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	const id = uIntMake(0, Number(req.params.id));
	const communityId = uIntMake(0, Number(req.params.communityId));

	res.json({
		page: `/community/${communityId()}/proposal/${id()}`
	});
});

router.get('/:communityId/proposal/view/:id', async (req: ApiLambdaRequest, res: ApiLambdaResponse) => {
	const id = uIntMake(0, Number(req.params.id));
	const communityId = uIntMake(0, Number(req.params.communityId));

	res.json({
		page: `/community/${communityId()}/proposal/view/${id()}`
	});
});

export default router;
