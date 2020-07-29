#!/bin/bash

#Step 2: set up nginx
sudo apt update

sudo apt -y install nginx

sudo ufw allow 'Nginx HTTPS'

sudo addgroup sftp-users
sudo adduser $USER sftp-users
sudo adduser www-data sftp-users
sudo chown root /var/www
sudo chgrp sftp-users /var/www
sudo chmod 775 /var/www
sudo chmod g+s /var/www
sudo mkdir /var/www/felt.dev
sudo chown $USER /var/www/felt.dev

#Step 3: set up https
#????

#Step 4: set up http2
#????

#Step 5: set up Nginx config
#TODO parameriatize script with domain name (or make that seperate script/config)
pwd=`pwd`

ln -sf ${pwd}/src/project/deploy/nginx_server_config.conf /etc/nginx/sites-available/felt.dev

# restart service to pick up new config
sudo nginx -t
sudo systemctl restart nginx

ln -sf ${pwd}/src/project/deploy/pm2-app.json /var/www/felt.dev/pm2-app.json

#Step 6: Install node & other deps
# manage Node via fnm - https://github.com/Schniz/fnm
sudo apt install -y unzip # fnm dependency
curl -fsSL https://github.com/Schniz/fnm/raw/master/.ci/install.sh | bash

###seems to be an issue here where fnm isn't sourcing onto the cli properly
source /root/.bashrc
fnm install v12.16 && fnm use v12.16

# install pm2 to manage the Node server process - https://github.com/Unitech/pm2
npm i -g pm2

# install gro
npm i -g @feltcoop/gro

# put these at the end to play nice with others?
export DEPLOY_SERVER_DIR=/var/www/felt.dev>>~/.bashrc
export DEPLOY_NODE_PROCESS_NAME=/var/www/felt.dev/pm2-app.json>>~/.bashrc
export SERVER_DEPLOY=true>>~/.bashrc
