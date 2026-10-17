# Тотьмотики

Добрый лендинг персонажей **Тотьмотики** — [totimotiki.ru](https://totimotiki.ru).

## Быстрый старт

```bash
npm install
npm run dev
```

Сборка: `npm run build` → каталог `dist/`.

## Документация

- [Архитектура](docs/architecture.md)
- [Деплой: Cloudflare DNS + certbot (как diabal)](docs/deploy.md)

## CI/CD

При пуше в `main` GitHub Actions собирает сайт и выкладывает на VPS по SSH.
Нужны секреты — см. [docs/deploy.md](docs/deploy.md).
