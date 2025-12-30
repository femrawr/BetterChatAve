import path from 'path';
import Terser from 'terser-webpack-plugin';

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [new Terser({
            terserOptions: {
                keep_fnames: false,
                compress: {
                    keep_fnames: false
                },
                mangle: {
                    keep_fnames: false
                }
            }
        })]
    }
};