import { rspack } from '@rspack/core'

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
  plugins: [new rspack.CircularDependencyRspackPlugin({
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
