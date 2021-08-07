const CopyWebpackPlugin = require('copy-webpack-plugin');
const { join, dirname } = require('path');

const STREAM_SAVER_DIR = dirname(require.resolve('streamsaver'));

module.exports = {
  publicPath: process.env.PUBLIC_PATH || '',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { from: join(STREAM_SAVER_DIR, 'mitm.html') },
        { from: join(STREAM_SAVER_DIR, 'sw.js') },
      ]),
    ]
  },
}
