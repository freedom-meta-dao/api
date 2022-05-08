import CommunityRootRouter from './module/community/root.router';
import {Router} from 'express';

const router: Router = Router();

router.use('/community', CommunityRootRouter);
router.use('/communities', CommunityRootRouter);

export default router;
