import { CleanWebpackPlugin as CleanPlugin } from 'clean-webpack-plugin';
import * as HtmlPlugin from 'html-webpack-plugin';
import * as CssPlugin from 'mini-css-extract-plugin';
import { join } from 'path';
import { TsconfigPathsPlugin as PathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration, Options, WatchIgnorePlugin } from 'webpack';
import { IfDevelopment, IfDevServer, IfProduction } from './util/Environment';
import { DistDir, SrcDir } from './util/Paths';
import ForkPlugin = require('fork-ts-checker-webpack-plugin');

const Extensions = [
	'.js', '.mjs', '.ts', '.tsx'
];

export default (): Configuration => ({
	target: 'web',
	mode: IfProduction('production', 'development'),
	devtool: IfProduction<Options.Devtool>('cheap-source-map', 'cheap-eval-source-map'),

	entry: {
		bundle: [...IfDevelopment(['preact/debug'], []), SrcDir('index')]
	},

	output: {
		path: IfDevServer(DistDir(), DistDir('assets', 'scripts')),
		filename: '[name]-[hash].js'
	},

	resolve: {
		extensions: Extensions,

		alias: {
			'aphrodite': 'aphrodite/no-important'
		},

		plugins: [
			new PathsPlugin({
				extensions: Extensions
			})
		]
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							projectReferences: true
						}
					}
				]
			},

			{
				enforce: 'pre',
				test: /\.[t|j]sx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'source-map-loader'
					}
				]
			},

			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: CssPlugin.loader
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	devServer: {
		https: true,
		port: 3000,
		host: '0.0.0.0',
		historyApiFallback: true
	},

	plugins: [
		new WatchIgnorePlugin([
			/\.js$/,
			/\.d\.ts$/
		]),

		new CleanPlugin({
			cleanStaleWebpackAssets: true
		}),

		new ForkPlugin({
		}),

		new HtmlPlugin({
			inject: 'head',
			scriptLoading: 'defer',
			filename: IfDevServer('index.html', join('..', '..', 'index.html'))
		}),

		new CssPlugin({
			filename: IfDevServer('[name]-[hash].css', join('..', 'styles', '[name]-[hash].css'))
		})
	]
});
