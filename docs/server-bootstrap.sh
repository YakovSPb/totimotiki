#!/usr/bin/env bash
# Запускать на VPS от root после того, как SSH доступен:
#   ssh -i ~/.ssh/id_ed25519 root@31.177.83.170 'bash -s' < docs/server-bootstrap.sh

set -euo pipefail

DOMAIN="totimotiki.ru"
WEB_ROOT="/var/www/${DOMAIN}"

apt-get update
apt-get install -y nginx rsync

mkdir -p "${WEB_ROOT}"
chown -R www-data:www-data "${WEB_ROOT}"

cat > "/etc/nginx/sites-available/${DOMAIN}" <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name totimotiki.ru www.totimotiki.ru;

    root /var/www/totimotiki.ru;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$ {
        expires 7d;
        add_header Cache-Control "public";
    }
}
NGINX

ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl reload nginx

echo "OK: nginx готов, корень ${WEB_ROOT}"
echo "После DNS: certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
