# Felt deployment

Felt is being developed on Ubuntu 18.04
running on a \$5/mo Digital Ocean VPS,
but the instructions should work
for any cloud Linux VPS provider.

## Server setup

### 1. Initial server setup

- https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04

### 2. Nginx installation

- skip step 5 of the tutorial -
  https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04 -
  and do this instead:

We make a special user group for accessing the website's directories, and
include both our user and nginx's `www-data` user. This provides a good mix of
security and convenience. See the answer by user cube here:
https://www.digitalocean.com/community/questions/proper-permissions-for-web-server-s-directory

```bash
$ sudo addgroup sftp-users
$ sudo adduser $USER sftp-users
$ sudo adduser www-data sftp-users
$ sudo chown root /var/www
$ sudo chgrp sftp-users /var/www
$ sudo chmod 775 /var/www
$ sudo chmod g+s /var/www
$ sudo mkdir /var/www/felt.dev
$ sudo chown $USER /var/www/felt.dev
```

### 3. https

- https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04

### 4. http2

- currently not enabled in [the nginx config](nginx_server_config.conf)
- https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-18-04

### 5. Nginx config

copy [the nginx config `./nginx_server_config.conf`](nginx_server_config.conf)
to `/etc/nginx/sites-available/felt.dev`
(replacing `felt.dev` in both the config file and path - TODO automate)

### 6. Install node and other deps

```bash
# manage Node via fnm - https://github.com/Schniz/fnm
$ sudo apt install -y unzip # fnm dependency
$ curl -fsSL https://github.com/Schniz/fnm/raw/master/.ci/install.sh | bash
$ fnm install v12 && fnm use v12
# install pm2 to manage the Node server process - https://github.com/Unitech/pm2
$ npm i -g pm2
```

### 7. Start the server

TODO automate initial deployment

On the dev machine, manually do the following:

- copy `src/project/deploy/pm2-app.json` to `/var/www/felt.dev`
- run `npm run build` to create the build
- run `npm run deploy` to copy the build `/var/www/felt.dev/dist`

```bash
$ pm2 start /var/www/felt.dev/pm2-app.json
$ pm2 ls # should see your thing
# TODO server is erroring after a reboot and pm2's error log isn't helpful
$ pm2 startup # and follow the instructions
$ pm2 save
```

Subsequent deployments should be as simple as `npm run build && npm run deploy`.
