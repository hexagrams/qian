import { defineConfig } from 'umi';

export default defineConfig({
  title: false,
  history: {
    type: 'hash',
  },
  hash: false,
  outputPath: './build',
  ignoreMomentLocale: true,
  runtimePublicPath: true,
  nodeModulesTransform: {
    type: 'none',
  },
  qiankun: {
    slave: {},
  },
  webpack5: {}, // 启动webpack5
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  externals: {},
  scripts: [],
  alias: {
    '@': './src',
  },
  chainWebpack(config) {},
  proxy: {
    '/api': {
      //target: 'http://linshenglong.cn',
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      // pathRewrite: { '^/igate': '' },
    },
    '/public': {
      //target: 'http://linshenglong.cn',
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      // pathRewrite: { '^/igate': '' },
    },
  },
});
