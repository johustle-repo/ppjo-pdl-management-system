#!/usr/bin/env bash
set -e

mkdir -p storage/framework/cache \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache || true
chmod -R ug+rwx storage bootstrap/cache || true

php artisan config:clear
php artisan queue:work --verbose --tries=1 --timeout=90
