import { rspack } from '@rspack/core'
import CircularDependencyWebpackPlugin from 'circular-dependency-plugin'

const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main:{
      import:  "./src/index",
      layer: 'main'
    },
  },
  plugins: [
    isRunningRspack ?
    new rspack.CircularDependencyRspackPlugin({
    failOnError: true,
  }): new CircularDependencyWebpackPlugin({
        failOnError: true,
      })],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: './echo-loader.js',
      }
    ]
  },
  output: {
    clean: true,
    filename: "[name].js",
  },
  experiments: {
    css: true,
    layers: true,
  },
};

export default config;
