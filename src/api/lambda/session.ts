import type {APIGatewayProxyEvent} from 'aws-lambda';
import {ApiLambdaSessionUser} from './session/user';
import {StrongMap} from '@toreda/strong-types';

/**
 * Session info used by AWS Lambda function handlers called
 * from AWS API Gateway. User details are extracted from
 * the authorizer for the API Gateway call. No user details
 * available when the call does not use an authorizer.
 *
 * @category API
 */
export class ApiLambdaSession extends StrongMap {
	public readonly user: ApiLambdaSessionUser;

	constructor(event: APIGatewayProxyEvent) {
		super();
		this.user = new ApiLambdaSessionUser();
		this.loadEvent(event);
	}

	/**
	 * Parse an API Gateway event and extract user details
	 * from authorizer, if present.
	 * @param event
	 */
	public loadEvent(event: APIGatewayProxyEvent): void {
		if (!event) {
			return;
		}

		if (!event.requestContext) {
			return;
		}

		if (!event.requestContext.authorizer) {
			return;
		}

		if (!event.requestContext.authorizer.claims) {
			return;
		}

		// Reset all user properties to default before attempting to parse
		// or apply new properties.
		this.user.reset();

		const claims = event.requestContext.authorizer.claims;
		this.user.username(claims['cognito:username']);
		this.user.email(claims.email);
		this.user.name(claims.name);
		this.user.uid(claims.sub);
		this.user.phone.verified(claims['phone_number_verified']);
	}

	/**
	 * Reset all properties to initial values.
	 */
	public reset(): void {
		if (this.user) {
			this.user.reset();
		}
	}
}
