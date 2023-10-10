/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';
import flexBugs from 'postcss-flexbugs-fixes';
import pxToViewport from 'postcss-px-to-viewport';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env['VITE_CONFIG_BASE'],
    build: {
      outDir: env['VITE_CONFIG_OUTDIR'],
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      },
      cssTarget: 'chrome61'
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'chrome > 31',
              'ff > 31',
              'ie >= 9',
              '> 1%'
            ],
            grid: true
          }),
          flexBugs,
          //移动端单位转换
          pxToViewport({
            unitToConvert: 'px', //需要转换的单位，默认为"px"
            viewportWidth: 375, //设计稿的视口宽度
            unitPrecision: 6, //单位转换后保留的精度
            propList: ['*'], //能转化为vw的属性列表
            viewportUnit: 'vw', //希望使用的视口单位
            fontViewportUnit: 'vw', //字体使用的视口单位
            selectorBlackList: [], //需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
            minPixelValue: 1, //设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: true, //媒体查询里的单位是否需要转换单位
            exclude: [],
            landscape: false
          })
        ]
      }
    }
  };
});
