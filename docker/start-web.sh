#!/usr/bin/env bash
set -e

if [ -z "${APP_KEY:-}" ]; then
  echo "APP_KEY is not set. Configure APP_KEY in Render environment variables."
  exit 1
fi

php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan migrate --force --no-interaction

if [ "${RUN_DB_SEED_ON_BOOT}" = "true" ]; then
  php artisan db:seed --force --no-interaction
fi

php artisan storage:link || true

exec apache2-foreground
