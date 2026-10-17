#!/usr/bin/env bash
# Тот же VPS, что diabal: root@168.113.158.146
#   ssh -i ~/.ssh/id_ed25519 root@168.113.158.146 'bash -s' < docs/server-bootstrap.sh

set -euo pipefail

DOMAIN="totimotiki.ru"
WEB_ROOT="/var/www/${DOMAIN}"

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

nginx -t
systemctl reload nginx

echo "OK: nginx на :80, корень ${WEB_ROOT}"
echo "DNS → 168.113.158.146, затем: certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
