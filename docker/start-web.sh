#!/usr/bin/env bash
set -e

if [ -z "$APP_KEY" ]; then
  php artisan key:generate --force --no-interaction
fi

php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan migrate --force --no-interaction
php artisan storage:link || true

exec apache2-foreground
