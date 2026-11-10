import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [react()],
  vite: { plugins: [tailwindcss()], css: { postcss: { plugins: [] } } },
  adapter: vercel(),
  output: 'static',
  site: 'https://www.islahwebservice.com',
  trailingSlash: 'never',
});
