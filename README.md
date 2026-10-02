# toolbunker.dev

## Local development

Use Node.js 22.12 or newer, then install and start the site through the
project's npm scripts:

```sh
npm install
npm run dev
```

Do not run a globally installed `astro` executable. The project pins Astro
7.2.4; mixing it with another global Astro runtime can fail while rendering
pages with `Unknown chunk type`.
