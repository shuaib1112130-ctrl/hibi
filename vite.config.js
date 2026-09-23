import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.mp3',
        '**/*.mp4',
        '**/*.wav',
        '**/*.ogg',
        '**/*.jpeg',
        '**/*.jpg',
        '**/*.png',
        '**/*.gif',
        '**/public/assets/**',
      ],
    },
  },
});
