import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@hexagrams/plugin-ice-stark'],
  iceStark: {
    slave: {},
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
});
