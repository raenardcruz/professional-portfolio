# Nginx Static Content & Caching

A comprehensive, production-grade guide to optimizing static file delivery, configuring browser caching headers, utilizing server-side proxy caching, and configuring gzip compression.

---

## Introduction

Nginx is exceptionally efficient at serving static files (images, CSS, JavaScript, HTML documents) directly from disk without invoking application servers. Offloading static assets from your Node.js, Python, or Go server to Nginx dramatically reduces backend load and improves page speed.

```mermaid
graph TD
    Client[Client Request] --> Nginx{Nginx Cache Check}
    Nginx -- Cache Hit (Memory/Disk) --> Client
    Nginx -- Cache Miss --> Backend[Backend Server]
    Backend --> CacheWrite[Write to Cache]
    CacheWrite --> Nginx
```

---

## 1. Serving Static Assets Directly

To host a Single Page Application (React/Vue/Angular) or static website, map requests to a local project directory.

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/my-app/dist;
    index index.html;

    # Handle SPA routing (fallback to index.html for clients-side routing)
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 2. Browser Caching Configuration

By telling client browsers to cache static assets, subsequent visits load instantly, eliminating redundant network traffic.

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/my-app/dist;

    # Cache Images and Media for 1 Month
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|svg|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Don't cache HTML files (ensures immediate updates to users)
    location ~* \.html$ {
        add_header Cache-Control "no-store, no-cache, must-revalidate";
        expires -1;
    }
}
```

### Cache-Control Directives Explained:
*   `public`: Allows any cache (browser, proxy, CDN) to store the file.
*   `no-transform`: Prevents intermediate proxies from altering the resource (e.g., resizing images).
*   `no-store`: Instructs browsers and proxies to never save the resource in memory or disk.
*   `must-revalidate`: Requires browsers to query Nginx to check if the file changed before using its local cache.

---

## 3. Proxy Cache (Server-Side Cache)

If Nginx acts as a reverse proxy, you can cache backend responses directly on Nginx disk storage.

```nginx
# Configure the cache directory, sizing, and key zones
# (Define this in the http block of nginx.conf)
proxy_cache_path /var/cache/nginx/api_cache levels=1:2 keys_zone=my_api_cache:10m max_size=1g inactive=60m use_temp_path=off;

server {
    listen 80;
    server_name api.example.com;

    location /v1/public/ {
        proxy_pass http://127.0.0.1:3000;
        
        # Apply the proxy cache
        proxy_cache my_api_cache;
        
        # Define response cache rules
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 1m;
        
        # Bypass cache if specified header is set
        proxy_cache_bypass $http_cache_bypass;
        
        # Add Header to show cache status (HIT or MISS)
        add_header X-Cache-Status $upstream_cache_status;

        # Keep stale cache during backend failure
        proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
    }
}
```

> [!NOTE]
> **Key Configuration Parameters**:
> - `levels=1:2`: Establishes a two-level directory hierarchy under `/var/cache/nginx/` to prevent directory lookup performance degradation.
> - `keys_zone=my_api_cache:10m`: Assigns a 10MB memory pool to store keys and metadata.
> - `max_size=1g`: Constrains the cache disk size to 1GB. When full, Nginx deletes the least recently used (LRU) cache items.

---

## 4. Gzip Compression Tuning

Enabling text-based compression (Gzip) dramatically reduces the size of HTML, CSS, and JS payloads sent over the wire.

```nginx
# (Place in the http block or server block)
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6; # 1 (fastest/least compressed) to 9 (slowest/most compressed)
gzip_buffers 16 8k;
gzip_http_version 1.1;

# Specify file types to compress (HTML is compressed by default)
gzip_types
    text/plain
    text/css
    application/json
    application/javascript
    application/x-javascript
    text/xml
    application/xml
    application/xml+rss
    text/javascript
    image/svg+xml;
```
