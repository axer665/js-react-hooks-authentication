import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

const cherryPickedKeys = [
  "REACT_APP_NEWS_URL",
  "REACT_APP_AUTH_URL",
  "REACT_APP_USER_URL"
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          implementation: sass,
          api: 'modern-compiler' // or "modern"
        },
      },
    },
  }
})
