# felt

[<img src="static/logo-192-textured.png" align="right" width="192" height="192">](https://felt.dev)

> customizable community tools that feel good :green_heart:

[`felt`](https://github.com/feltcoop/felt)
seeks to empower people,
help us organize,
and improve our communication

- **work in progress** mockup at [felt.dev](https://felt.dev)
- learn [about `felt`](https://felt.dev/about)
- community at [felt.social](https://felt.social) and [its source code](https://github.com/feltcoop/felt.social)

## credits :turtle: <sub>:turtle:</sub><sub><sub>:turtle:</sub></sub>

made by
[all these people](https://github.com/feltcoop/felt/graphs/contributors)
and [a community](https://felt.social)
using [`svelte`](https://github.com/sveltejs/svelte),
[`sapper`](https://github.com/sveltejs/sapper),
[`typescript`](https://github.com/microsoft/TypeScript),
[`babel`](https://github.com/babel/babel),
[`rollup`](https://github.com/rollup/rollup),
[`prettier`](https://github.com/prettier/prettier),
[`postcss`](https://github.com/postcss/postcss),
[`tailwindcss`](https://github.com/tailwindcss/tailwindcss),
[`sirv`](https://github.com/lukeed/sirv),
[`polka`](https://github.com/lukeed/polka),
[`node`](https://github.com/nodejs/node),
[`fnm`](https://github.com/Schniz/fnm),
[`github`](https://github.com), [`git`](https://git-scm.com/),
and [so many more](https://en.wikipedia.org/wiki/Free_and_open-source_software)

## develop

### play with the code

Don't have `node` and `npm` installed?
See [fnm](https://github.com/Schniz/fnm):

```bash
fnm install v12
fnm use v12
```

With node v12+ installed:

```bash
npm i
npm run ts # gogo typescript
npm run tw # open another shell
npm run dev # browse to localhost:3000 or whatever it says
```

See the [package.json](package.json) for more.

### deploy to real life

- instructions at [src/deploy/README.md](src/deploy/README.md)
- [nginx server config](src/deploy/nginx_server_config.conf) for `felt.dev`

```bash
npm i
npm run build
npm start
```

## license

[ISC](license)
<sub>permissive <3 [learn more at wikipedia](https://en.wikipedia.org/wiki/ISC_license)</sub>
