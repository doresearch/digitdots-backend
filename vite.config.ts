/** @format */
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import ElementPlus from 'unplugin-element-plus/dist/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import federation from '@originjs/vite-plugin-federation'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const clientID = env.VITE_PAYPAL_CLIENT_ID
  const secret = env.VITE_PAYPAL_SECRET

  return {
    base: env.VITE_APP_BASE_URL || '/',
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
      // federation({
      //   name: 'hostApp',
      //   remotes: {
      //     // remoteApp: 'http://localhost:8089/assets/remoteEntry.js',
      //     // remoteApp: {
      //     //   external: `Promise.resolve('http://localhost:8089/assets/remoteEntry.js')`,
      //     //   externalType: 'promise',
      //     // },
      //   },
      //   shared: ['vue', 'pinia'],
      // }),
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
            injectScript: `
            <script src="https://www.paypal.com/sdk/js?client-id=${clientID}"></script>
            <script
              type="text/javascript"
              src="https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js"
            ></script>
          `,
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
          manualChunks(id: any): string {
            // 最小化拆分包
            if (id.includes('node_modules')) {
              return 'vendor' + id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: '[ext]/[name].[hash].[ext]',
        },
      },
    },
  }
})
