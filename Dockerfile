FROM rustlang/rust:nightly as builder

RUN apt update && apt upgrade -y
RUN apt install -y default-libmysqlclient-dev libpq-dev libsqlite3-dev

WORKDIR /tmp
COPY . /tmp

RUN cargo build --release

FROM debian:unstable-slim

RUN mkdir -p /app

COPY --from=builder /tmp/target/release/paperbox /app/paperbox

RUN apt update && apt upgrade -y

RUN apt install -y imagemagick default-libmysqlclient-dev libpq-dev libsqlite3-dev

VOLUME [ "/store" ]
ENV STORAGE_PATH=/store
ENTRYPOINT [ "/app/paperbox" ]