#!/usr/bin/env bash
set -e

if [ -z "${APP_KEY:-}" ]; then
  echo "APP_KEY is not set. Configure APP_KEY in Render environment variables."
  exit 1
fi

# Force file-backed runtime storage for shell-less/free deployments.
# This avoids 500 errors when database-backed session/cache tables are missing.
export SESSION_DRIVER=file
export CACHE_STORE=file

mkdir -p storage/framework/cache \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache || true
chmod -R ug+rwx storage bootstrap/cache || true

php artisan config:clear
php artisan route:clear || true
php artisan view:clear || true

echo "[BOOT] Running migrations..."
php artisan migrate --force --no-interaction
echo "[BOOT] Migrations completed successfully."

echo "[BOOT] Running database seeders..."
php artisan db:seed --force --no-interaction
echo "[BOOT] Database seeders completed successfully."

php artisan storage:link || true

exec apache2-foreground
