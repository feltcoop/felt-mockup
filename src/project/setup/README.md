# Felt development setup

This document walks through setting up Felt for development.

## Initial setup

**1. Install system dependencies**

[See our docs](system.md) for installing Felt's system dependencies.

**2. Set up your editor**

We recommend VSCode for its Svelte support.
See [our docs for setting it up](vscode.md).
Other editors may have
[varying degrees of support for Svelte](https://github.com/sveltejs/integrations).

**3. Install Node dependencies**

```bash
$ npm i
```

See [`package.json`](/package.json) for more about what's being installed.
Felt tries to minimize external dependencies within reason -
if you see avoidable bloat please help us reduce it!

Felt uses [Gro](https://github.com/feltcoop/gro) for task running and other development needs.
Install it globally to add its CLI to your system PATH:

```bash
$ npm i -g @feltcoop/gro
```

**4. Initialize .env**

Copy [`.env.sample`](.env.sample) as `.env` to the root directory.
This file will not be committed in git.

```bash
$ cp src/project/setup/.env.sample .env
```

> TODO automate this with a setup task

Now it's time to set up a database and environment variables.
By default PostgreSQL uses the "postgres" user.
Set a password for it:

```bash
$ sudo -u postgres psql
```

```
postgres=# \password
<enter your password>
```

Add that password to `.env` at the root of your project.

```bash
DB_NAME=felt_dev
DB_USER=postgres
DB_PASS=<your password> # <-- replace with your password
```

Create the database:

```bash
$ sudo -u postgres createdb felt_dev # same as DB_NAME
```

Note that you'll have to add additional config to this file
before [deploying to a production server](../deploy).

**5. Run the dev server!**

```bash
$ gro dev # the globally installed Gro defers to the local version
```

Now open your browser to `localhost:3000` or whatever it says.

> If you experience any issues with `gro dev` failing with a weird error, try running `gro clean`.

All done! Felt should now be running on your local machine for development.
To deploy to a real life server, see [our deployment instructions](../deploy).
