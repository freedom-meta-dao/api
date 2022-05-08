import type {Configuration} from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import Path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import WebpackNodeExternals from 'webpack-node-externals';
//import slsw from 'serverless-webpack';
import yargs from 'yargs';

const entry = './src/main.ts';
const argv = yargs.argv;
const isProd = argv.env === 'dev' ? 'dev' : 'prod';

const config: Configuration = {
	context: __dirname,
	mode: isProd ? 'production' : 'development',
	devtool: isProd ? undefined : 'inline-source-map',
	entry,
	output: {
		pathinfo: false,
		filename: '[name].js',
		path: Path.join(__dirname, '.webpack'),
		libraryTarget: 'commonjs'
	},
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	externals: [
		WebpackNodeExternals({
			modulesDir: Path.resolve(__dirname, '../../../node_modules')
		})
	],
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'swc-loader'
				}
			}
		]
	},
	target: 'node',
	optimization: {
		minimize: isProd ? true : false,
		removeAvailableModules: isProd ? true : false,
		providedExports: isProd ? true : false,
		usedExports: isProd ? true : false,
		concatenateModules: isProd ? true : false,
		innerGraph: isProd ? true : false,
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				parallel: true,
				terserOptions: {
					compress: false,
					mangle: false,
					keep_classnames: true
				}
			})
		]
	},
	plugins: [new ForkTsCheckerWebpackPlugin()]
};

export default config;
