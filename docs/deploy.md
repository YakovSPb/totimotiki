# Деплой и домен

Схема как у **diabal**: Cloudflare только DNS (серое облако) → VPS `168.113.158.146` → nginx + Let’s Encrypt.

Тот же сервер, что `diabal.ru` / `memo.diabal.ru`.

## Секреты GitHub Actions

Репозиторий: [YakovSPb/totimotiki](https://github.com/YakovSPb/totimotiki)

| Secret | Значение |
|--------|----------|
| `SSH_PRIVATE_KEY` | Приватный ключ (`~/.ssh/id_ed25519`), целиком |
| `SSH_HOST` | `168.113.158.146` |
| `SSH_USER` | `root` |
| `DEPLOY_PATH` | `/var/www/totimotiki.ru` |

Подключение вручную:

```bash
ssh -i ~/.ssh/id_ed25519 root@168.113.158.146
```

## Cloudflare (только DNS)

| Тип | Имя | Содержимое | Proxy |
|-----|-----|------------|-------|
| A | `@` | `168.113.158.146` | **DNS only** (серое) |
| A | `www` | `168.113.158.146` | **DNS only** (серое) |

Оранжевый Proxied не включать.

```bash
dig +short totimotiki.ru A
# ожидаем: 168.113.158.146
```

## Nginx + HTTPS

На сервере уже есть nginx и certbot. Сайт: `/var/www/totimotiki.ru`, конфиг `totimotiki.ru` в sites-enabled.

Выпуск сертификата (когда DNS уже на `168.113.158.146`):

```bash
ssh -i ~/.ssh/id_ed25519 root@168.113.158.146 \
  'certbot --nginx -d totimotiki.ru -d www.totimotiki.ru --non-interactive --agree-tos --redirect'
```

Первичный bootstrap (если сайт ещё не заведён):

```bash
cd ~/Рабочий\ стол/Projects/totimotiki
ssh -i ~/.ssh/id_ed25519 root@168.113.158.146 'bash -s' < docs/server-bootstrap.sh
npm run build
rsync -az --delete -e "ssh -i ~/.ssh/id_ed25519" dist/ root@168.113.158.146:/var/www/totimotiki.ru/
```

## Локальная разработка

```bash
npm install
npm run dev
```
