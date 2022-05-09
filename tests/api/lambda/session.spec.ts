import {APIGatewayProxyEvent} from 'aws-lambda';
import {ApiLambdaSession} from '../../../src/api/lambda/session';

function mockEvent(): APIGatewayProxyEvent {
	return {
		headers: {},
		httpMethod: 'get',
		isBase64Encoded: false,
		resource: '__',
		body: '',
		multiValueHeaders: {},
		stageVariables: {},
		path: '',
		pathParameters: {},
		queryStringParameters: {},
		multiValueQueryStringParameters: {},
		requestContext: {
			accountId: 'aaa',
			apiId: 'aaa',
			httpMethod: 'get',
			authorizer: {},
			stage: 'dev',
			requestId: 'aaa-aaaa-aa9719714',
			resourceId: 'aaa-aaa-aa',
			resourcePath: 'aaaaaaa',
			requestTimeEpoch: 1100023,
			protocol: '',
			path: 'aaaa',
			identity: {
				accessKey: 'aaa',
				accountId: 'aaa',
				apiKey: 'aaa',
				apiKeyId: 'aaa',
				user: 'aaa',
				userArn: 'aa:aa:aa',
				cognitoIdentityId: 'aaa',
				cognitoAuthenticationType: 'aaa',
				clientCert: 'aaa' as any,
				principalOrgId: 'aaaaa',
				userAgent: 'agent string',
				sourceIp: '0.0.0.0',
				cognitoAuthenticationProvider: 'aaa',
				cognitoIdentityPoolId: 'aaa.aaa.aaa',
				caller: 'aaa'
			}
		}
	};
}

/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */
describe('ApiLambdaSession', () => {
	let instance: ApiLambdaSession;
	let event: APIGatewayProxyEvent;

	beforeAll(() => {
		event = mockEvent();
		instance = new ApiLambdaSession(event);
	});

	beforeEach(() => {
		event = mockEvent();
	});

	describe('Constructor', () => {
		it(`should create and populate user property`, () => {
			const custom = new ApiLambdaSession(event);
		});
	});
});
