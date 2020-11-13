FROM golang:1.15.5-buster as schemer2-builder

RUN go get github.com/thefryscorer/schemer2

FROM rustlang/rust:nightly as builder

RUN apt update && apt upgrade -y
RUN apt install -y default-libmysqlclient-dev libpq-dev libsqlite3-dev

WORKDIR /tmp
COPY . /tmp

RUN cargo build --release

FROM debian:unstable-slim

RUN mkdir -p /app

COPY --from=builder /tmp/target/release/paperbox /app/paperbox
COPY --from=schemer2-builder /go/bin/schemer2 /usr/local/bin/schemer2
ADD ./gen_themes.py /usr/local/bin/gen_themes

RUN apt update && apt upgrade -y

RUN apt install -y imagemagick default-libmysqlclient-dev libpq-dev libsqlite3-dev python3 python3-pip

RUN pip3 install colorz haishoku pywal colorthief

VOLUME [ "/store" ]
ENV STORAGE_PATH=/store
ENTRYPOINT [ "/app/paperbox" ]
