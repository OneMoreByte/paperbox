#!/bin/sh

host=$()

until psql $DATABASE_URL -c '\l'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

# Provision db
cd /diesel
/root/.cargo/bin/diesel migration run

# Get To Server
cd /app
/app/paperbox