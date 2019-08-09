const path = require('path');

const proxyTarget = 'http://192.168.1.222:3000';

export default {
  "theme": {//主题
    //"@primary-color": "#fff"
  },
  publicPath: '/web/static/',
  "alias": {
    "src": path.resolve('./src'),
    "@": path.resolve('./src'),
    "@components": path.resolve('./src/components'),
    "@utils": path.resolve('./src/utils'),
    "@common": path.resolve('./src/common'),
    "@layouts": path.resolve('./src/layouts'),
    "@declare": path.resolve('./src/declare')
  },
  externals: {
    "BMap": "BMap"
  },
  "proxy": {
    '/api/': {
      "target": proxyTarget,
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }

}