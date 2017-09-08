const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: './public',
  publicPath: config.output.publicPath,
  hot: true,
  disableHostCheck: true,
  proxy: {
    '/hermes-web/*': {
      target: 'http://testhermes.caocaokeji.cn/',
      //target: 'http://testhermes1.caocaokeji.cn/',  //�ճ�����
      //target: 'http://114.55.30.0:7080',
      //target: 'http://192.168.2.87:8086',
      secure: false,
      changeOrigin: true
    }
  },
  historyApiFallback: true
}).listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8080');
});
