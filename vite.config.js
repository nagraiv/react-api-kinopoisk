import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './',
    plugins: [react()],
    define: {
      // 'process.env.KINOPOISK_API_KEY': JSON.stringify(env.KINOPOISK_API_KEY),
      'process.env': env,
    },
  };
});
