module.exports = {
	roots: ['./'],
	testEnvironment: 'jsdom',
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
	transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)']

};
