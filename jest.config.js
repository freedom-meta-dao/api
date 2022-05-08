module.exports = {
	roots: ['./'],
	coverageDirectory: './coverage',
	coveragePathIgnorePatterns: [
		'.eslintrc.js',
		'.node/',
		'build-events.ts',
		'coverage/',
		'jest.config.js',
		'jest/',
		'node_modules/',
		'tests/',
		'webpack.config.js',
		'webpack.dev.js',
		'docs/',
		'src/main/index.ts'
	],
	moduleFileExtensions: ['ts', 'js', 'json'],
	moduleNameMapper: {
		'^src/(.*)': '<rootDir>/src/$1'
	},
	setupFiles: ['jest-canvas-mock'],
	testPathIgnorePatterns: [
		'.eslintrc.js',
		'build-events.ts',
		'node_modules/',
		'coverage/',
		'gulp.js',
		'gulp.ts',
		'./jest.config.js',
		'./webpack.*.js',
		'./webpack.*.ts'
	],
	testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.ts$',
	testResultsProcessor: 'jest-sonar-reporter',
	transform: {'^.+\\.(t|j)sx?$': '@swc/jest'},
	transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
	testEnvironment: 'jest-environment-node-single-context'
};
