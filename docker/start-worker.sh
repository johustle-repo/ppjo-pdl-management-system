#!/usr/bin/env bash
set -e

php artisan config:clear
php artisan queue:work --verbose --tries=1 --timeout=90
