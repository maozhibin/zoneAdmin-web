const join = require('path').join;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './dev/index',
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'redux', 'react-redux', 'react-router', 'react-router-redux', 'redux-thunk', 'react-addons-css-transition-group'],
    common: ['caoh5-polyfill','caoh5-request','caoh5-util']
  },
  output: {
    path: join(__dirname, '/build'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  resolve: {
    modules: [join(__dirname, 'node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-3'],
              plugins: ['transform-decorators-legacy'],
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true, importLoaders: 1 } },
            { loader: 'postcss-loader' }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true, importLoaders: 1 } },
            { loader: 'postcss-loader'},
            { loader: 'less-loader' }
          ]
        })
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          'url-loader?limit=8192&name=asset/image/[hash:8].[name].[ext]'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: [
          'url-loader?limit=8192'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, '/dev/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(['build'], {
      root: '', // An absolute path for the root  of webpack.rule.js
      verbose: true,// Write logs to console.
      dry: false // Do not delete anything, good for testing.
    }),
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }),
    new ExtractTextPlugin('[name]-[chunkhash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'vendor', 'manifest']
    })
  ]

};