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

## Code Buster installers

`public/codebuster/install` and `public/codebuster/install.ps1` are the canonical
installer sources published at `/codebuster/install` and
`/codebuster/install.ps1`. Validate the shell script with `sh -n` and the
PowerShell script with the PowerShell parser when changing them.
