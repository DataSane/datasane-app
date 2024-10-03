#!/usr/bin/env bash
# wait-for-mysql-connection.sh

set -e

host="$1"
shift
cmd="$@"

until mysql -h "$host" -u "$DB_USER" -p"$DB_PASSWORD" -e 'SELECT 1'; do
  >&2 echo "MySQL isn't avaiable - waiting..."
  sleep 1
done

>&2 echo "MySQL is reading - executing command..."
exec $cmd
