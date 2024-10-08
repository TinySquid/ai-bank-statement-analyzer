#!/bin/sh

until nc -z -v -w30 postgres 5432
do
  echo "Waiting for postgres database connection..."
  sleep 3
done

yarn prisma generate

yarn db:setup

exec "$@"