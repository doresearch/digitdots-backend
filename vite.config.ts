/** @format */
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import ElementPlus from 'unplugin-element-plus/dist/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import federation from '@originjs/vite-plugin-federation'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
import { createHtmlPlugin } from 'vite-plugin-html'

const clientID = 'Ac0OUgp3Bql521DY-3ycWeKV_k9EwgN5Ty4qsWoDrC-9HT3OaVakvYSD-IctpwVsA5fuOxxNekvtAfu7'
const secret = 'ENkjwaBjAhZb_2f38Wl5fQAh3qILzqdwKo0aUDe4f_6PlGmodhgHD3xWK3Aty0ZOR4pjD-TUjogKSe0p'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    vueSetupExtend(),
    ElementPlus({
      // options
    }),
    eslintPlugin(),
    federation({
      name: 'hostApp',
      remotes: {
        remoteApp: 'http://localhost:8089/assets/remoteEntry.js',
        // remoteApp: {
        //   external: `Promise.resolve('http://localhost:8089/assets/remoteEntry.js')`,
        //   externalType: 'promise',
        // },
      },
      shared: ['vue', 'pinia'],
    }),
    createHtmlPlugin({
      minify: true,
      /**
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default src/main.ts
       */
      entry: 'src/main.ts',
      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          title: 'index',
          injectScript: `<script src="https://www.paypal.com/sdk/js?client-id=${clientID}"></script>`,
        },
        tags: [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'tag',
            },
          },
        ],
      },
    }),
    resolveExternalsPlugin({
      paypal: 'paypal',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/var-global.scss";',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8066,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        // manualChunks(id: any): string {
        //   // 最小化拆分包
        //   if (id.includes('node_modules')) {
        //     return 'vendor' + id.toString().split('node_modules/')[1].split('/')[0].toString()
        //   }
        // },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        // entryFileNames: 'js/[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        // chunkFileNames: 'js/[name].[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        // assetFileNames: '[ext]/[name].[hash].[ext]',
      },
    },
  },
})
