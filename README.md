# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Тестирование и отладка Telegram Mini App

Мини‑приложение Telegram — обычный сайт, который открывается внутри клиента Telegram. Для локальной разработки нужна публичная HTTPS‑ссылка на ваш `localhost`. Самый удобный способ — Dev Tunnels в VS Code (альтернатива — ngrok).

### Быстрый чек‑лист

1) Запустить локально: `npm run dev` (по умолчанию порт `5173`).

2) Пробросить порт 5173:
- VS Code → Terminal → вкладка `Ports` → `Forward a Port` → `5173`.
- Скопировать `Remote Address` вида `https://<hash>-5173.<region>.devtunnels.ms`.

3) Приватность порта:
- `Port Visibility` → `Private` (только вы) или `Public` (доступно всем).

4) Привязать ссылку к боту:
- BotFather → `Bot Settings` → `Menu Button` → `Web App` → вставить HTTPS‑ссылку туннеля.

5) Отладка:
- Telegram Web: `https://web.telegram.org/a/` (доступны DevTools).
- Мобильные клиенты: используйте оверлей логов в UI или `Telegram.WebApp.showAlert/showPopup` для быстрых проверок.

### Dev Tunnels (рекомендуется)

- Запуск: создайте перенаправление для `5173` как указано выше и используйте выданную HTTPS‑ссылку.
- Постоянная ссылка: `Ctrl+Shift+P` → `Dev Tunnels: Create Tunnel` → отметьте Persistent, затем `Share Local Port (5173)`.
- HMR/WS: при проблемах добавьте в `vite.config.ts` (при необходимости):

  ```ts
  import { defineConfig } from 'vite'
  export default defineConfig({
    server: {
      host: true,
      hmr: { clientPort: 443 },
    },
  })
  ```

### Доступ (Public/Private) и авторизация

- Если при открытии туннеля запрашивается вход через GitHub/Microsoft, туннель создан как `Private`.
- Telegram WebApp не умеет проходить такую авторизацию. Происходит редирект на github.com, который запрещён во фреймах (CSP: `frame-ancestors 'none'`), из‑за чего вы видите ошибку «Refused to frame 'https://github.com/' …».
- Решение:
  - Вкладка VS Code `Ports` → правый клик по порту → `Port Visibility` → `Public`.
  - Для Persistent‑туннеля: `Dev Tunnels: Manage Access` → разрешите Anonymous/Public.
  - Проверьте в приватном окне браузера: ссылка должна открываться без логина.
  - Обновите ссылку у бота в BotFather после смены доступа.

### Ngrok (альтернатива)

- Установка и запуск: `ngrok http 5173` → получите ссылку `https://*.ngrok.app`.
- Постоянный домен: зарезервируйте домен в кабинете ngrok и запускайте `ngrok http --domain=myapp.ngrok.app 5173`.
- Ограничение доступа: `--basic-auth user:pass` или политики IP.

### Привязка в Telegram

- Кнопка Web App: BotFather → `Menu Button` → `Web App` → вставьте HTTPS‑ссылку.
- Быстрый диплинк: `https://t.me/<bot_username>?startapp=dev`.
- Через сообщение: используйте клавиатуру с `web_app: { url: "<ваш HTTPS>" }` на стороне бота.

### Частые проблемы и решения

- HMR/WebSocket не коннектится: задайте `server.hmr.clientPort = 443` и оставьте запуск `vite --host`.
- CORS к бэкенду: разрешите домены туннеля (`*.devtunnels.ms`/`*.ngrok.app`).
- Mixed Content: используйте только HTTPS‑ссылки в мини‑приложении.
- Меняющийся домен: используйте Persistent Tunnel (Dev Tunnels) или Reserved Domain (ngrok).

### Полезные советы

- Зафиксируйте порт при разработке: запускать `vite` с `--strictPort` (например, обновить скрипт `dev` до `vite --host --strictPort`).
- Для мобилок добавьте временную панель логов или отправку логов на тестовый эндпоинт.

## 🔐 Настройка SSH-доступа к серверу (Regru)

### 1. Генерация SSH-ключа

- Linux / macOS:

```bash
ssh-keygen -t ed25519 -C "regru-deploy" -f ~/.ssh/id_ed25519_regru
```

- Windows PowerShell:

```powershell
mkdir $HOME\.ssh -Force
ssh-keygen -t ed25519 -C "regru-deploy" -f "$HOME\.ssh\id_ed25519_regru"
```

После выполнения появятся два файла:

- `id_ed25519_regru` — приватный ключ (хранить только локально)
- `id_ed25519_regru.pub` — публичный ключ (копировать на сервер)

### 2. Добавление публичного ключа на сервер

- Вариант 1. Автоматически (если есть парольный доступ)

  ```bash
  ssh-copy-id -i ~/.ssh/id_ed25519_regru.pub your_login@your_domain.ru
  ```

- Вариант 2. Вручную

  Выведите публичный ключ:

  - Linux / macOS:

    ```bash
    cat ~/.ssh/id_ed25519_regru.pub
    ```

  - Windows PowerShell:

    ```powershell
    Get-Content "$HOME\.ssh\id_ed25519_regru.pub"
    ```

  Скопируйте всю строку целиком.

  Подключитесь по паролю:

  ```bash
  ssh your_login@your_domain.ru
  ```

  На сервере выполните:

  ```bash
  mkdir -p ~/.ssh && chmod 700 ~/.ssh
  nano ~/.ssh/authorized_keys
  ```

  Вставьте строку ключа, сохраните (Ctrl + O, Enter, Ctrl + X), затем установите права:

  ```bash
  chmod 600 ~/.ssh/authorized_keys
  chmod go-w ~
  ```

### 3. Проверка подключения

- Linux / macOS:

```bash
ssh -i ~/.ssh/id_ed25519_regru your_login@your_domain.ru
```

- Windows PowerShell:

```powershell
ssh -i "$HOME\.ssh\id_ed25519_regru" your_login@your_domain.ru
```

Если вход выполнен без пароля — всё настроено правильно.

### 4. Упрощение подключения через SSH-config

- Windows PowerShell:

```powershell
ni -ItemType File "$HOME\.ssh\config" -Force
@"
Host regru
  HostName your_domain.ru
  User your_login
  IdentityFile C:/Users/gilbe/.ssh/id_ed25519_regru
  IdentitiesOnly yes
"@ | Set-Content -NoNewline "$HOME\.ssh\config"
```

- Linux / macOS:

```bash
nano ~/.ssh/config
```

Вставьте:

```conf
Host regru
  HostName your_domain.ru
  User your_login
  IdentityFile ~/.ssh/id_ed25519_regru
  IdentitiesOnly yes
```

Теперь подключение выполняется одной командой:

```bash
ssh regru
```

### Примечания по безопасности

- Проверьте права доступа:

  ```bash
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/id_ed25519_regru
  chmod 600 ~/.ssh/authorized_keys
  ```

- В Windows в `IdentityFile` в `~/.ssh/config` используйте прямые слэши (`/`) и путь без пробелов, либо берите путь в кавычки при использовании в командной строке.

## 🚀 CI/CD: деплой на Regru по FTPS

Код автоматически деплоится в каталог `/www/your_name` по FTPS (порт 21, explicit TLS) через GitHub Actions.

Что настроить
- Секреты в GitHub (Settings → Secrets and variables → Actions):
  - `FTP_HOST` — адрес FTP (например, `server277.hosting.reg.ru`).
  - `FTP_USER` — логин FTP.
  - `FTP_PASS` — пароль FTP.
  - `FTP_PORT` — опционально, по умолчанию `21`.
  - `TG_BOT_TOKEN`, `TG_CHAT_ID` — для Telegram‑уведомлений.
- Путь деплоя в workflow: по умолчанию `/www/your_name`.

Как запускать
- Автоматически при пуше в ветку `dev`.
- Вручную: вкладка Actions → `deploy-dev` → Run workflow.

Как работает деплой
- Сборка: `npm ci && npm run build:dev` (Vite), результат — папка `dist`.
- Заливка: `lftp mirror -R --delete` — серверная папка становится точной копией `dist`.
- Важно: флаг `--delete` удалит файлы на сервере, которых нет в `dist`.

Замечания и безопасность
- FTPS использует TLS, но проверка сертификата отключена в workflow (`set ssl:verify-certificate no`) из‑за самоподписанных сертификатов на shared‑хостинге. Для строгой проверки включите `yes` в файле `.github/workflows/deploy-dev.yml`.
- Пассивный режим включён, EPSV отключён для совместимости с хостингом.

Файл workflow
- Конфигурация: `.github/workflows/deploy-dev.yml`.

## ⚙️ ENV и сборки

- Файлы окружений (подхватываются Vite при сборке):
  - `.env.development` — для dev‑сборки
  - `.env.production` — для prod‑сборки
  - Видимы в клиенте только переменные с префиксом `VITE_`.
- Скрипты:
  - `npm run build:dev` — сборка с режимом `development` (использует `.env.development`)
  - `npm run build:prod` — сборка с режимом `production` (использует `.env.production`)
- Автодеплой из ветки `dev` собирает `build:dev` и выкладывает `dist` на сервер.
