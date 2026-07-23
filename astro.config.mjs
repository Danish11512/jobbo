import { defineConfig } from 'astro/config';
import bun from '@wyattjoh/astro-bun-adapter';
import solid from '@astrojs/solid-js';

export default defineConfig({
  output: 'server',
  adapter: bun(),
  integrations: [solid()],
});
