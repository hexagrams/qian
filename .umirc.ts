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
});
