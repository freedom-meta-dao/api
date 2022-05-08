import type {Bool, Text} from '@toreda/strong-types';
import {StrongMap, boolMake, textMake} from '@toreda/strong-types';

/**
 * User properties for current API request when using
 * a Lambda API Proxy integration. Details parsed from
 * API Gateway route authorizer, if one is set.
 *
 * @category API
 */
export class APILambdaSessionUser extends StrongMap {
	public readonly uid: Text;
	public readonly sid: Text;
	public readonly skey: Text;
	public readonly username: Text;
	public readonly name: Text;
	public readonly email: Text;
	public readonly phone: {
		number: Text;
		verified: Bool;
	};

	public readonly anonymous: Bool;
	public readonly loggedIn: Bool;

	constructor() {
		super();
		this.uid = textMake('');
		this.sid = textMake('');
		this.skey = textMake('');
		this.username = textMake('');
		this.name = textMake('');
		this.email = textMake('');
		this.phone = {
			number: textMake(''),
			verified: boolMake(false)
		};

		this.loggedIn = boolMake(false);
		this.anonymous = boolMake(true);
	}

	/**
	 * Reset all properties to their initial values.
	 */
	public reset(): void {
		this.uid.reset();
		this.sid.reset();
		this.skey.reset();
		this.username.reset();
		this.name.reset();
		this.email.reset();
		this.phone.number.reset();
		this.phone.verified.reset();
		this.loggedIn.reset();
		this.anonymous.reset();
	}
}
