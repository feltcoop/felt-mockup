# Felt deployment

Felt is being developed on Ubuntu 18.04
running on a \$5/mo Digital Ocean VPS,
but the instructions should work
for any cloud Linux VPS provider.

## Server setup

### 1. Initial server setup

- https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04

### 2. Nginx installation & Server Configuration

- Clone the felt git repository into your server
  ```bash
  git clone https://github.com/feltcoop/felt.git
  ```
- Then move into the newly cloned repo and run the initialization script
  ```bash
  . src/project/deploy/initialize-server.sh
  ```

This will set up the folder and permissions structures, install dependencies, and overall set you up to build and deploy new versions of felt onto your server.

NOTE: Currently the script expects the domain name to be <felt.dev>, you will currently have to manually replace it with your own anticipated URL

TODO: (replacing `felt.dev` in both the config file and path automatically)

### 3. https

- https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04

### 4. http2

- currently not enabled in [the nginx config](nginx_server_config.conf)
- https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-18-04

### 5. Start the server

There are two ways to build and deploy the server. Either locally or from the machine itself.

To build & deploy from your local machine, follow the [setup](../setup) instructions then:

1. copy src/project/deploy/pm2-app.json to /var/www/felt.dev
2. run `gro build` to create the build
3. run `gro deploy` to copy the build /var/www/felt.dev/dist

> Tip: you can run `gro deploy --dry` to see the final deployment command without executing it.

```bash
$ pm2 start /var/www/felt.dev/pm2-app.json
$ pm2 ls # should see your thing
# TODO server is erroring after a reboot and pm2's error log isn't helpful
$ pm2 startup # and follow the instructions
$ pm2 save
```

To build & deploy on your server, run the following commands from the repository root on your server

```bash
$ npm i
$ gro build
$ gro deploy
```

For either choice, subsequent deployments should be as simple as `gro build && gro deploy`.
