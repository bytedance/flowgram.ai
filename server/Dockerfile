FROM rust:1-bookworm AS build
WORKDIR /src
COPY Cargo.toml Cargo.lock ./
COPY server server
COPY desktop/src-tauri/Cargo.toml desktop/src-tauri/Cargo.toml
COPY desktop/src-tauri/build.rs desktop/src-tauri/build.rs
COPY desktop/src-tauri/src desktop/src-tauri/src
RUN cargo build --locked --release -p flowgram-desktop-backend --bin flowgram-service

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/* \
    && useradd --uid 10001 --create-home flowgram && mkdir /data && chown flowgram:flowgram /data
COPY --from=build /src/target/release/flowgram-service /usr/local/bin/flowgram-service
USER 10001:10001
ENV FLOWGRAM_SERVICE_DATA_DIR=/data FLOWGRAM_SERVICE_BIND=0.0.0.0:18790
VOLUME ["/data"]
EXPOSE 18790
ENTRYPOINT ["flowgram-service"]
CMD ["serve"]
