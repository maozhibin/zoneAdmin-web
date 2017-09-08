const join = require('path').join;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './dev/index.js',
  ],
  output: {
    path: join(__dirname, '/build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },

  // context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './build',

    proxy: [{
      context: '/hermes-web/',
      changeOrigin: true,
      target: 'http://114.55.30.0:7080',
    }],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-3'],
              plugins: ['transform-decorators-legacy',['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',

                  imports: ['react'],

                  locals: ['module'],
                }],
              }]],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {modules: false}},
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          'url-loader?limit=8192&name=asset/image/[hash:8].[name].[ext]',
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: [
          'url-loader?limit=8192',
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),


    new HtmlWebpackPlugin({
      template: join(__dirname, '/dev/index.html'),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({browsers: ['last 2 versions']}),
        ],
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new ExtractTextPlugin('[name]-[chunkhash:8].css'),
  ],
};