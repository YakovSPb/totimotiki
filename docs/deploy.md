# Деплой и домен

## Секреты GitHub Actions

Репозиторий: [YakovSPb/totimotiki](https://github.com/YakovSPb/totimotiki)

**Settings → Secrets and variables → Actions** — добавить:

| Secret | Значение |
|--------|----------|
| `SSH_PRIVATE_KEY` | Содержимое приватного ключа (`~/.ssh/id_ed25519`), целиком, включая `BEGIN`/`END` |
| `SSH_HOST` | `31.177.83.170` |
| `SSH_USER` | `root` |
| `DEPLOY_PATH` | `/var/www/totimotiki.ru` |

Публичный ключ должен быть в `~/.ssh/authorized_keys` на сервере.

## Nginx на VPS

Файл `/etc/nginx/sites-available/totimotiki.ru`:

```nginx
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
```

Активация:

```bash
ln -sf /etc/nginx/sites-available/totimotiki.ru /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

HTTPS (после того как DNS указывает на сервер):

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d totimotiki.ru -d www.totimotiki.ru
```

## DNS на reg.ru

Панель: домен **totimotiki.ru** → DNS / управление зоной.

| Тип | Имя | Значение |
|-----|-----|----------|
| A | `@` | `31.177.83.170` |
| A | `www` | `31.177.83.170` |

Либо `www` как CNAME на `totimotiki.ru`.

Удалите конфликтующие записи A/AAAA от парковки reg.ru. TTL можно 300–600 на время переключения.

Проверка:

```bash
dig +short totimotiki.ru A
curl -I http://totimotiki.ru
```

## Локальная разработка

```bash
npm install
npm run dev
```
