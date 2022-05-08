import type {Response} from 'express-serve-static-core';

/**
 * Response returned by Lambda-based Express API routes
 * called from AWS Gateway API.
 *
 * @category API
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApiLambdaResponse extends Response {}
