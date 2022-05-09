import type {DatastoreCode} from './code';
import type {DatastoreEntity} from './entity';
import type {DatastorePath} from './path';
import {errorMkCode} from '@toreda/chk';

/**
 *
 * @param code
 * @param entity
 * @param path
 * @returns
 *
 * @category Datastore
 */
export function datastoreError(
	code: DatastoreCode,
	entity: DatastoreEntity,
	...path: DatastorePath[]
): string {
	return errorMkCode<DatastoreCode, DatastoreEntity, DatastorePath>(code, entity, path);
}
