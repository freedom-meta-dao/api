import {Community, CommunityMember, CommunityRole} from '@freedom-meta-dao/sdk';
import type {CommunityData, CommunityMemberData, CommunityRoleData} from '@freedom-meta-dao/sdk';

import {Dynamo} from './dynamo';
import {Fate} from '@toreda/fate';
import {datastoreError} from './datastore/error';

export class Datastore {
	public async getCommunity(ddb: Dynamo, id: string): Promise<Fate<Community>> {
		const fate = new Fate<Community>();
		const result = await this.getCommunityData(ddb, id);

		if (!result.success()) {
			return fate.setErrorCode(result.errorCode());
		}

		try {
			fate.data = new Community(result.data);
			fate.success(true);
		} catch (e) {
			fate.setErrorCode(datastoreError('exception', 'community', 'make_instance'));
		}

		return fate;
	}

	public async getCommunityRole(ddb: Dynamo, roleId: string): Promise<Fate<CommunityRole>> {
		const fate = new Fate<CommunityRole>();

		const result = await this.getCommunityRoleData(ddb, roleId);
		if (!result.success()) {
			return fate.setErrorCode(result.errorCode());
		}

		if (result.data === undefined || result.data === null) {
			return fate.setErrorCode(datastoreError('no_matching_records', 'communityRole', 'record'));
		}

		try {
			const role = new CommunityRole(result.data);
			fate.data = role;
		} catch (e) {
			fate.error(e);
			fate.setErrorCode(datastoreError('create_failed', 'communityRole'));
		}

		return fate;
	}

	public async getCommunityRoleData(ddb: Dynamo, roleId: string): Promise<Fate<CommunityRoleData>> {
		const fate = new Fate<CommunityRoleData>();

		if (!ddb) {
			return fate.setErrorCode(datastoreError('missing', 'ddb', 'arg'));
		}

		if (roleId === undefined || roleId === null) {
			return fate.setErrorCode(datastoreError('missing', 'communityRoleId', 'arg'));
		}

		if (typeof roleId !== 'string') {
			return fate.setErrorCode(datastoreError('bad_format', 'communityRoleId', 'arg'));
		}

		try {
			const record = await ddb.getRecord<CommunityRoleData>('community', 'communityId', roleId);

			if (record) {
				fate.data = record;
				fate.success(true);
			} else {
				fate.setErrorCode(datastoreError('missing', 'communityRoleId', 'record'));
			}
		} catch (e) {
			fate.setErrorCode(datastoreError('exception', 'query'));
		}

		return fate;
	}

	public async getCommunityData(ddb: Dynamo, communityId: string): Promise<Fate<CommunityData>> {
		const fate = new Fate<CommunityData>();

		if (!ddb) {
			return fate.setErrorCode(datastoreError('missing', 'ddb', 'arg'));
		}

		if (communityId === undefined || communityId === null) {
			return fate.setErrorCode(datastoreError('missing', 'communityId', 'arg'));
		}

		if (typeof communityId !== 'string') {
			return fate.setErrorCode(datastoreError('bad_format', 'communityId', 'arg'));
		}

		try {
			const record = await ddb.getRecord<CommunityData>('community', 'communityId', communityId);

			if (record) {
				fate.data = record;
				fate.success(true);
			} else {
				fate.setErrorCode(datastoreError('missing', 'community', 'record'));
			}
		} catch (e) {
			fate.setErrorCode(datastoreError('exception', 'query'));
		}

		return fate;
	}

	public async memberGluedId(communityId: string, memberId: string): Promise<string | null> {
		if (!communityId || !memberId) {
			return null;
		}

		if (typeof communityId !== 'string' || typeof memberId !== 'string') {
			return null;
		}

		// Length check must occur before trim to prevent trims attempts on arbitrarily long strings.
		if (communityId.length > 80 || memberId.length > 80) {
			return null;
		}

		return `${communityId.trim()}__${memberId.trim()}`;
	}

	public async getCommunityMemberData(
		ddb: Dynamo,
		communityId: string,
		memberId: string
	): Promise<Fate<CommunityMemberData>> {
		const fate = new Fate<CommunityMemberData>();

		if (!ddb) {
			return fate.setErrorCode(datastoreError('missing', 'ddb', 'arg'));
		}

		if (communityId === undefined || communityId === null) {
			return fate.setErrorCode(datastoreError('missing', 'communityId', 'arg'));
		}

		if (typeof communityId !== 'string') {
			return fate.setErrorCode(datastoreError('bad_format', 'communityId', 'arg'));
		}

		if (memberId === undefined || memberId === null) {
			return fate.setErrorCode(datastoreError('missing', 'communityMemberId', 'arg'));
		}

		if (typeof memberId !== 'string') {
			return fate.setErrorCode(datastoreError('bad_format', 'communityMemberId', 'arg'));
		}

		const hashId = await this.memberGluedId(communityId, memberId);
		if (hashId === null) {
			return fate.setErrorCode(datastoreError('bad_hash_op', 'communityMember', 'hashId'));
		}

		try {
			const record = await ddb.getRecord<CommunityMemberData>('community_member', 'hashId', hashId);

			if (record) {
				fate.data = record;
				fate.success(true);
			} else {
				fate.setErrorCode(datastoreError('missing', 'community', 'record'));
			}
		} catch (e) {
			fate.setErrorCode(datastoreError('exception', 'query'));
		}

		return fate;
	}

	public async getCommunityMember(
		ddb: Dynamo,
		communityId: string,
		memberId: string
	): Promise<Fate<CommunityMember>> {
		const fate = new Fate<CommunityMember>();
		const result = await this.getCommunityMemberData(ddb, communityId, memberId);

		if (!result.success()) {
			return fate.setErrorCode(result.errorCode());
		}

		if (result.data === null || result.data === undefined) {
			return fate.setErrorCode(datastoreError('not_found', 'communityMember', 'record'));
		}

		try {
			fate.data = new CommunityMember(result.data);
			fate.success(true);
		} catch (e) {
			fate.setErrorCode(datastoreError('exception', 'community', 'make_instance'));
		}

		return fate;
	}
}
