# Архитектура

Статический лендинг **Тотьмотики** (`totimotiki.ru`).

## Стек

- Vite (vanilla HTML/CSS/JS)
- Деплой: GitHub Actions → rsync по SSH на VPS
- Веб-сервер: тот же VPS, что diabal — `168.113.158.146` (nginx + Let’s Encrypt)
- DNS: Cloudflare (только DNS, без прокси), как у diabal.ru

## Структура

| Путь | Назначение |
|------|------------|
| `index.html` | Точка входа |
| `src/main.js` | Разметка и лёгкая интерактивность |
| `src/styles.css` | Стили лендинга |
| `public/characters.png` | Визуал персонажей |
| `.github/workflows/deploy.yml` | CI/CD |
| `docs/` | Соглашения и инструкции |

## Поток деплоя

1. Push в `main` (или ручной `workflow_dispatch`)
2. `npm ci` → `npm run build` → артефакт в `dist/`
3. `rsync` на сервер в каталог из секрета `DEPLOY_PATH`
4. nginx отдаёт статику для `totimotiki.ru`
