FROM rust:nightly as builder

WORKDIR /tmp
COPY . /tmp

RUN cargo build

FROM debian:unstable

RUN apt update && apt upgrade

