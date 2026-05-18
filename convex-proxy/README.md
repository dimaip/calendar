# Convex reverse proxy

This proxy lets the browser use `https://convex.molitva.app` while the proxy connects to the hosted Convex deployment at `https://expert-marmot-529.convex.cloud`.

The proxy must run on infrastructure that is reachable from Russia and must not be hidden behind Cloudflare. Caddy handles WebSocket upgrades automatically.

## Fly.io deploy

This directory includes `fly.toml` for an always-on tiny Fly Machine in `fra`.

Log in and deploy:

```sh
flyctl auth login
cd convex-proxy
flyctl apps create molitva-convex-proxy
flyctl deploy --local-only --ha=false
```

Then attach the custom domain:

```sh
flyctl certs add convex.molitva.app
flyctl certs show convex.molitva.app
```

Use the DNS target shown by `flyctl certs show`. The current Fly app uses:

```text
A    convex.molitva.app -> 66.241.124.54
AAAA convex.molitva.app -> 2a09:8280:1::117:66b4:0
```

Keep Cloudflare/CDN proxying disabled for this record.

## VPS deploy

On a small VPS with Docker installed, run the proxy behind an HTTPS terminator:

```sh
cd convex-proxy
docker compose up -d --build
```

The default environment targets production:

```text
CONVEX_PROXY_PORT=80
CONVEX_UPSTREAM_HOST=expert-marmot-529.convex.cloud
```

To proxy another Convex deployment, change `CONVEX_UPSTREAM_HOST` in `docker-compose.yml`.

## Verify

After DNS has propagated and the container is running:

```sh
curl -I https://convex.molitva.app
```

The response should come from Convex. Then rebuild and deploy the app so the browser bundle uses:

```text
CONVEX_URL=https://convex.molitva.app
```

The production `build` and `build-aws` scripts already use this URL.

## Hosting notes

Use a simple always-on VPS if possible. Avoid Vercel Functions for this proxy because they do not support acting as a WebSocket server. Free app-hosting tiers can sleep or rotate instances, which is bad for long-lived Convex connections.
