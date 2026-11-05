import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://toolbunker.dev',
  output: 'static',
  integrations: [sitemap()],
});
