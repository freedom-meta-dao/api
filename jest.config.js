module.exports = {
	roots: ['./'],
	coverageDirectory: './coverage',
	coveragePathIgnorePatterns: [
		'.eslintrc.js',
		'.node/',
		'coverage/',
		'docs/',
		'jest.config.js',
		'jest/',
		'node_modules/',
		'tests/',
		'webpack.config.js',
		'webpack.dev.js'
	],
	moduleFileExtensions: ['ts', 'js', 'json'],
	moduleNameMapper: {
		'^src/(.*)': '<rootDir>/src/$1'
	},
	setupFiles: ['jest-canvas-mock'],
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: [
		'./jest.config.js',
		'./webpack.*.js',
		'./webpack.*.ts',
		'.eslintrc.js',
		'coverage/',
		'gulp.js',
		'gulp.ts',
		'node_modules/'
	],
	testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.ts$',
	testResultsProcessor: 'jest-sonar-reporter',
	transform: {'^.+\\.(t|j)sx?$': '@swc/jest'},
	transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)']
};
