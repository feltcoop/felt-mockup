# Felt system dependencies

This document walks through setting up system dependencies for Felt.
These steps are verified to work with
[Ubuntu 18.04](https://wiki.ubuntu.com/BionicBeaver/ReleaseNotes).

Felt is not currently tested on Windows.
For an optimal experience on Windows we recommend running
[WSL2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install)
with Ubuntu 18.04 and VSCode with the
[Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
extension.
See [our VSCode docs](vscode.md) for more.

**1. Install Git**

For instructions visit [git-scm.com](https://git-scm.com/).

**2. Install Node**

You can use any preferred method to [install Node](https://nodejs.org).
We recommend [fnm](https://github.com/Schniz/fnm):

Using `fnm use` in the root of the project will tell you what version to install.

```bash
$ fnm install v12
$ fnm use v12
```

You should now have both Node and npm installed.

```bash
$ node --version # => v12...
$ npm --version # => 6...
```

**3. Install PostgreSQL**

Felt is being developed with [PostgreSQL](https://www.postgresql.org) 11.
Earlier versions may work for now.

See [these instructions](https://www.postgresql.org/download/linux/ubuntu/)
to install Postgres 11 on Ubuntu 18.04.

```bash
$ sudo service postgresql start
```

Postgres should now be running.

```bash
$ sudo -u postgres psql # => should open the psql prompt
```

If the Postgres server isn't running,
[see the official docs](https://www.postgresql.org/docs/11/server-start.html)
for help.
