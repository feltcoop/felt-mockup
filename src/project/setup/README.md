# Felt development setup

This document walks through setting up Felt for development.

1. If you already have Node and npm installed, skip this step.

You can use any preferred method to [install Node](https://nodejs.org).
We recommend [fnm](https://github.com/Schniz/fnm):

```bash
fnm install v12
fnm use v12
```

You should now have both Node and npm installed.

```bash
node --version # => v12...
npm --version # => 6...
```

2. Copy [`.env.sample`](./.env.sample) as `.env` to the root directory.
   This file will not be committed in git.

```bash
cp src/project/setup/.env.sample .env
```

> TODO automate this with a setup task

For now you don't need to change any values,
but before [deploying to a production server](../deploy)
you'll need to edit `.env` with important config.

3. Install dependencies.

```bash
npm i
```

See [`package.json`](package.json) for more about what's being installed.
Felt tries to minimize external dependencies within reason -
if you see avoidable bloat please help us fix it!

4. Run the dev server!

```bash
npm run ts # gogo typescript
npm run tw # open another shell
npm run dev
```

> TODO wrap these into a single command

Now open your browser to `localhost:3000` or whatever it says.

All done! You should now be running Felt on your local machine for development.
To deploy to a real life server, see the deployment instructions
at [`src/project/deploy`](../deploy).
