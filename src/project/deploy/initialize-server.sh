#!/bin/bash

#Step 2: set up nginx
sudo apt update

sudo apt -y install nginx

sudo addgroup sftp-users
sudo adduser $USER sftp-users
sudo adduser www-data sftp-users
sudo chown root /var/www
sudo chgrp sftp-users /var/www
sudo chmod 775 /var/www
sudo chmod g+s /var/www
sudo mkdir /var/www/felt.dev
sudo chown $USER /var/www/felt.dev

export DEPLOY_SERVER_USE=www-data

#Step 3: set up https
#????

#TODO parameriatize script with domain name (or make that seperate script/config)
pwd=`pwd`

mkdir /etc/nginx/sites-available/felt.dev
ln -sf ${pwd}/src/project/deploy/nginx_server_config.conf /etc/nginx/sites-available/felt.dev/nginx_server_config.conf

ln -sf ${pwd}/src/project/deploy/pm2-app.json /var/www/felt.dev/pm2-app.json

#Step 6: Install node & other deps
# manage Node via fnm - https://github.com/Schniz/fnm
sudo apt install -y unzip # fnm dependency
curl -fsSL https://github.com/Schniz/fnm/raw/master/.ci/install.sh | bash
source /root/.bashrc
fnm install v12.16 && fnm use v12.16
# install pm2 to manage the Node server process - https://github.com/Unitech/pm2
npm i -g pm2

#Step 7: Start the server for the first time
npm run build
npm run deploy

pm2 start /var/www/felt.dev/pm2-app.json
pm2 ls
pm2 startup
pm2 save

