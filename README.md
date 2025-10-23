# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

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
