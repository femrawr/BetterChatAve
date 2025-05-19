const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const TerserPlugin = require('terser-webpack-plugin');

dotenv.config();

const header = `// ==UserScript==
// @name         Better Chat Avenue
// @version      ${process.env.VERSION}
// @description  tampermonkey script to make chatting sites like chat avenue abit better
// @author       warmchocolatedrink
// @match        *://*.chat-avenue.com/*
// @match        *://*.teen-chat.org/*
// @run-at       document-start
// ==/UserScript==\n`;

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'build.user.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						preamble: header,
						comments: false
					},
					compress: {
						drop_console: false
					}
				},
				extractComments: false
			})
		]
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: header,
			raw: true,
			entryOnly: true
		})
	]
};