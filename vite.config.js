import { defineConfig } from 'vite';

export default defineConfig({
  // For GitHub Pages with a custom domain, base should be '/'
  // If you were using a project repo URL (like /ilianakp.github.io/), it would be '/ilianakp.github.io/'
  base: '/',

  build: {
    outDir: 'dist',
    // Tell Vite about the extra HTML pages so they get included in the build
    rollupOptions: {
      input: {
        main: 'index.html',
        info: 'info.html',
        project: 'project.html',
      },
    },
  },
});
