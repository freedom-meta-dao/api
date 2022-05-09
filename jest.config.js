module.exports = {
	roots: ['./'],
	coverageDirectory: './coverage',
	coveragePathIgnorePatterns: [
		'.eslintrc.js',
		'.node/',
		'coverage/',
		'jest.config.js',
		'jest/',
		'node_modules/',
		'tests/',
		'docs/'
	],
	moduleFileExtensions: ['ts', 'js', 'json'],
	moduleNameMapper: {
		'^src/(.*)': '<rootDir>/src/$1'
	},
	testPathIgnorePatterns: [
		'.eslintrc.js',
		'node_modules/',
		'coverage/',
		'gulp.ts',
		'./jest.config.js',
		'./webpack.*.ts'
	],
	testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.ts$',
	testResultsProcessor: 'jest-sonar-reporter',
	transform: {'^.+\\.(t|j)sx?$': '@swc/jest'},
	transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
	testEnvironment: 'jsdom'
};
