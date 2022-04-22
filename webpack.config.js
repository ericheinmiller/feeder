const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'client', 'index.jsx'),
  mode: 'development',
  target: 'web',
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
  devServer: {
    proxy: {
      '/medium': {
        target: 'https://medium.com/feed/backchannel',
        pathRewrite: {
          "^/medium": "",
        },
        changeOrigin: true,
      },
      '/tech': {
        target: 'https://techcrunch.com/startups/feed/',
        pathRewrite: {
          "^/tech": "",
        },
        changeOrigin: true,
      },
      '/api': {
        target: 'https://pokeapi.co/api/v2/pokemon/ditto',
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
      '/test': {
        target: 'https://blog.ethereum.org/feed.xml',
        pathRewrite: {
          "^/test": "",
        },
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    fallback: {
      process: require.resolve("process/browser"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
      buffer: require.resolve("buffer"),
      asset: require.resolve("assert"),
    }
  },
};
