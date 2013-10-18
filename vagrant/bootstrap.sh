#!/bin/bash

apt-get update

# deps
apt-get install -y python-software-properties

# nginx
add-apt-repository -y ppa:nginx/stable
apt-get update
apt-get install -y nginx

# client
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs
cd /vagrant
npm install -g grunt-cli bower
npm install
grunt build

# nginx
ln -sf /vagrant/vagrant/etc/nginx/nginx.conf /etc/nginx/nginx.conf
nginx

