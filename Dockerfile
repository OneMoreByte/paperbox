FROM golang:1.15.5-buster as schemer2-builder

RUN go get github.com/thefryscorer/schemer2

FROM rustlang/rust:nightly as rust-builder

RUN apt update && apt upgrade -y
RUN apt install -y default-libmysqlclient-dev libpq-dev libsqlite3-dev

WORKDIR /tmp/backend
COPY ./backend /tmp/backend

RUN cargo build --release

FROM node:latest as node-builder

COPY ./frontend /tmp/frontend
WORKDIR /tmp/frontend
RUN npm install
RUN npm install -g @angular/cli
RUN npm run build:prod

FROM debian:unstable-slim as server

RUN mkdir -p /app/html

COPY --from=rust-builder /tmp/backend/target/release/paperbox /app/paperbox
COPY --from=node-builder /tmp/frontend/dist /app/html
COPY --from=schemer2-builder /go/bin/schemer2 /usr/local/bin/schemer2
ADD ./backend/gen_themes.py /usr/local/bin/gen_themes
ADD ./entrypoint.sh /app/entrypoint

RUN chmod 755 /app/entrypoint /usr/local/bin/gen_themes

ADD ./backend/migrations /diesel/migrations
ADD ./backend/src/schema.rs /diesel/src/schema.rs
ADD ./backend/diesel.toml /diesel/diesel.toml

RUN apt update && apt upgrade -y

RUN apt install -y imagemagick postgresql-client-13 default-libmysqlclient-dev libpq-dev libsqlite3-dev python3 python3-pip cargo

RUN cargo install diesel_cli --no-default-features --features postgres

RUN pip3 install colorz haishoku pywal colorthief

VOLUME [ "/store" ]
ENV STORAGE_PATH=/store
ENV FRONTEND_PATH=/app/html
ENTRYPOINT [ "/app/entrypoint" ]
