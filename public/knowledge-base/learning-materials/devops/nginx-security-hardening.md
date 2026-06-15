# Nginx Security & Rate Limiting

A comprehensive, production-grade guide to securing Nginx web servers, implementing rate limiting, restricting resource access, and applying essential HTTP security headers.

---

## Introduction

Securing your web server is a vital component of systems administration. By default, Nginx is secure, but additional configurations are recommended to mitigate common vulnerabilities such as Denial of Service (DoS), Cross-Site Scripting (XSS), Clickjacking, and unauthorized resource access.

---

## 1. Information Disclosure Protection

By default, Nginx displays its version number on error pages and in the `Server` HTTP header. Attackers can use this information to target vulnerabilities specific to that version.

```nginx
# (Place in the http block)
server_tokens off;
```

---

## 2. Rate Limiting (DDoS & Brute Force Protection)

Rate limiting is critical to protect authentication endpoints (like login pages) and API resources from brute force attacks and malicious scrapers.

```nginx
# Define rate limiting zone based on client IP
# (Define this in the http block of nginx.conf)
# 10m zone can store ~160,000 IP addresses. Rate is set to 5 requests per second.
limit_req_zone $binary_remote_addr zone=login_limit:10m rate=5r/s;

server {
    listen 80;
    server_name example.com;

    location /api/v1/login {
        # Apply rate limiting
        # burst=10: allows up to 10 requests to queue up before failing
        # nodelay: process the burst requests immediately rather than delaying them
        limit_req zone=login_limit burst=10 nodelay;
        
        proxy_pass http://127.0.0.1:3000;
    }
}
```

### Key Parameters:
*   `$binary_remote_addr`: Stores client IP address in binary format (occupies 4 times less memory than the string `$remote_addr`).
*   `burst`: Sets the maximum number of requests a client can make beyond the configured rate before they receive a `503 Service Unavailable` error.
*   `nodelay`: Without `nodelay`, burst requests are delayed to conform to the rate limit. With `nodelay`, burst requests are executed instantly, but subsequent requests that exceed the burst size are rejected immediately.

---

## 3. Connection Limits

Limit the number of simultaneous TCP connections from a single IP to prevent resource exhaustion.

```nginx
# (Define this in the http block)
limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

server {
    listen 80;
    
    # Restrict clients to a maximum of 10 simultaneous TCP connections
    limit_conn conn_limit 10;
}
```

---

## 4. HTTP Security Headers

Injecting modern security headers forces web browsers to enforce strict safety policies, preventing XSS and frame injection attacks.

```nginx
# (Apply inside the http block or specific server blocks)

# 1. Prevent Clickjacking (disallow loading site inside iframe)
add_header X-Frame-Options "SAMEORIGIN" always;

# 2. Prevent MIME type sniffing
add_header X-Content-Type-Options "nosniff" always;

# 3. Enable XSS protection filter in older browsers
add_header X-XSS-Protection "1; mode=block" always;

# 4. Control Referrer Information passed to external sites
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# 5. Restrict browser capabilities (Content Security Policy)
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

---

## 5. Request Method & Client Access Restrictions

### Restricting HTTP Methods
Many API servers only require `GET`, `POST`, and `DELETE`. Restricting HTTP verbs prevents malicious requests (e.g., `TRACE` or `OPTIONS` attacks).

```nginx
server {
    listen 80;
    
    # Block anything other than GET, POST, or HEAD
    if ($request_method !~ ^(GET|HEAD|POST)$ ) {
        return 444; # Special Nginx status code that closes the connection without returning headers
    }
}
```

### Access Control by IP (Firewalling)
You can block specific IPs or whitelist internal ranges:

```nginx
location /admin {
    # Allow local connections
    allow 192.168.1.0/24;
    allow 127.0.0.1;
    
    # Deny everyone else
    deny all;
}
```

### Hotlinking Prevention
Prevent other websites from embedding your hosted images or media directly on their pages, which steals your bandwidth.

```nginx
location ~ \.(gif|png|jpe?g)$ {
    # Verify referrer header
    valid_referers none blocked server_names *.mywebsite.com;
    
    if ($invalid_referer) {
        return 403;
    }
}
```
