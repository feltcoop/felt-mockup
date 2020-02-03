# deploy

TODO improve deployment docs!

## server setup

### tutorials followed

- setup
  - https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
- nginx
  - skip step 5 and follow the "www dirs" instructions below instead
  - https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
- https
  - https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04
- http2
  - currently not enabled
  - https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-18-04

### app setup

#### www dirs

Do this during the nginx tutorial above.

We make a sepecial user group for accessing the website's directories, and
include both our user and nginx's `www-data` user. This provides a good mix of
security and convenience. See the answer by user cube here:
https://www.digitalocean.com/community/questions/proper-permissions-for-web-server-s-directory

```bash
sudo addgroup sftp-users
sudo adduser $USER sftp-users
sudo adduser www-data sftp-users
sudo chown root /var/www
sudo chgrp sftp-users /var/www
sudo chmod 775 /var/www
sudo chmod g+s /var/www
sudo mkdir /var/www/felt.dev
sudo chown $USER /var/www/felt.dev
```
