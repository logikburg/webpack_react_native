// web/webpack.config.js

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../src');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  //test: /\.(js|jsx)?$/,
  test: /\.js$|jsx/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index_step_1.js'),
    path.resolve(appDirectory)
  ],
  exclude: /(node_modules)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-flow'
      ],
      plugins: ['@babel/proposal-class-properties'],
    }
  }
    //options: {
      // The 'react-native' preset is recommended to match React Native's packager
    //  presets: ['react', '@babel/preset-env', "@babel/preset-react"]
    //}
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index_step_1.js'),
  ],

  mode: process.env.NODE_ENV || 'development',

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, '../dist')
  },

  devtool: 'source-map',

  // ...the rest of your config
  //https://webpack.js.org/guides/typescript/#loader
  module: {
    rules: [
    babelLoaderConfiguration,
    imageLoaderConfiguration,
    {
      test: /\.(ts|tsx)?$/,
      use: 'ts-loader',
      exclude: /(node_modules|__tests__)/,
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true
          }
        }
      ],
      include: /\.module\.css$/
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ],
      exclude: /\.module\.css$/
    }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      //template: path.join(__dirname, 'index.html'),
      template: path.resolve(appDirectory, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
      contentBase: path.resolve(__dirname, '../src')
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web'
    },

    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    ],

    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ]
  }
}
