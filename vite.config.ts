import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: 'src/icons.d.ts',
      dirs: [],
      resolvers: [
        IconsResolver({
          prefix: 'i',
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      iconCustomizer(collection, icon, props) {
        props.width = '20'
        props.height = '20'
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    hmr: { clientPort: 443 },
  },
})
