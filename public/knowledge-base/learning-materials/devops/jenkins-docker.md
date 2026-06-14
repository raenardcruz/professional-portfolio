# Jenkins Setup using Docker

A comprehensive, production-ready guide to deploying, configuring, and running Jenkins inside Docker, including support for Docker-based builds (Docker-in-Docker and Host Socket Mount).

---

## Introduction

Jenkins is the leading open-source automation server. Running Jenkins inside Docker isolates the controller from the host system, guarantees reproducible environments, and simplifies updates. 

This guide details running a single Jenkins instance, configuring persistent volumes, and setting up Docker integration so that Jenkins pipelines can build and package Docker containers of their own.

---

## 1. Quick Start (Single Instance)

To spin up a basic Jenkins controller quickly, use the official `jenkins/jenkins:lts` image.

```bash
docker run -d \
  --name jenkins-quickstart \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

### Key Ports & Volumes
*   `8080`: Access to the web interface/dashboard.
*   `50000`: Used for connecting inbound Jenkins agents (formerly JNLP agents).
*   `jenkins_home`: A named Docker volume to persist Jenkins configuration, jobs, credentials, and plugins across container restarts.

---

## 2. Docker-in-Docker (DinD) & Host Socket Mounting

When running Jenkins in a container, you often need the pipeline jobs to run Docker commands (e.g., `docker build` or `docker run`). There are two common approaches to achieve this:

### Option A: Mounting the Host's Docker Daemon Socket (Recommended)
This approach shares the host machine's Docker daemon with the Jenkins container. It is fast, has zero overhead, and shares the host's image cache.

*   **Pros**: Highly efficient, shares host's image cache, easier setup.
*   **Cons**: Jenkins has root-level access to the host's Docker engine (potential security risk).

### Option B: Docker-in-Docker (DinD)
This approach runs a completely isolated Docker daemon inside a sibling container.

*   **Pros**: Completely isolated from the host machine.
*   **Cons**: Performance overhead, does not share the host's image cache, more complex networks.

---

## 3. Production Docker Compose Setup (Host Socket Mount)

For most developers and teams, mounting the host Docker socket is the most practical solution. To allow the Jenkins container to run Docker commands, we must build a custom Jenkins image that contains the Docker CLI, and run it with correct socket permissions.

### Project Layout
```text
jenkins-setup/
├── Dockerfile
├── docker-compose.yml
└── data/ (Auto-generated named volume or directory)
```

### 1. The `Dockerfile`
Create a custom Dockerfile to pre-install the Docker CLI inside the Jenkins LTS image.

```dockerfile
FROM jenkins/jenkins:lts-jdk17

USER root

# Install prerequisites
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key & repository
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker CLI
RUN apt-get update && apt-get install -y docker-ce-cli

# Return to jenkins user
USER jenkins
```

### 2. The `docker-compose.yml`
Define the service, configure volume mounts (including `/var/run/docker.sock`), and run as the correct group ID to access the Docker socket.

```yaml
version: '3.8'

services:
  jenkins:
    build: .
    container_name: jenkins-prod
    restart: always
    ports:
      - "8080:8080"
      - "50000:50000"
    user: root # Run as root to match socket permissions, or map host's docker GID
    environment:
      - TZ=UTC
    volumes:
      - ./data:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4G
        reservations:
          memory: 1G
```

> [!IMPORTANT]
> **Host Socket Permissions**: In the compose file above, we run the service as `user: root` for simplicity so that it has access to the mounted `/var/run/docker.sock`. For standard secure environments, it is recommended to create a dedicated user on the host, find the GID of the `docker` group on the host (`getent group docker | cut -d: -f3`), and add the `jenkins` user to that group inside the container or pass the GID.

---

## 4. Initial Setup & Configuration

Once your container is running (`docker compose up -d`), follow these steps to unlock Jenkins:

### Step 1: Retrieve the Initial Admin Password
To unlock the dashboard, you need the randomly generated token from the container logs or the server directory:

```bash
# Read from container logs
docker logs jenkins-prod

# Or read directly from the persistent volume file
cat ./data/secrets/initialAdminPassword
```

### Step 2: Access the Web UI
Navigate to `http://localhost:8080` in your web browser. Paste the admin password you retrieved and click **Continue**.

### Step 3: Install Plugins
Select **Install suggested plugins**. This will install common essentials such as:
*   Git
*   Pipeline
*   Credentials Provider
*   SSH Agent

### Step 4: Create Admin User
Provide your desired credentials to create the first administrative user, or click "Keep using admin" to skip.

---

## 5. Troubleshooting & Best Practices

> [!WARNING]
> **Docker Socket Permission Denied**: If you run into permission errors when executing `docker` commands inside a Jenkins pipeline, it means the `jenkins` user in the container doesn't have permissions to write to `/var/run/docker.sock`. Ensure either `user: root` is set in the compose file or you have aligned the container user GID with the host Docker group GID.

### Common Issues & Solutions

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **"Permission Denied" on `/var/run/docker.sock`** | Inside the container, the user does not have permission to read/write to the Docker daemon socket. | Run the container as `root`, or add `user: "1000:999"` (where 999 is host's docker GID). |
| **Jenkins Home Permission issues** | The host directory `./data` does not have correct read/write ownership. | Run `chown -R 1000:1000 ./data` on the host, since the default `jenkins` UID inside the container is `1000`. |
| **Out Of Memory (OOM) Kill** | Jenkins JVM consumed more memory than the container resource limits allowed. | Increase container memory limit or configure JVM options via environment variable `JAVA_OPTS="-Xmx2048m"`. |

### Security Checklist
1.  **Configure HTTPS**: Never run Jenkins over unencrypted HTTP in production. Wrap it behind a reverse proxy like Nginx or Traefik with an SSL certificate.
2.  **Turn Off Agent Port**: If you do not use JNLP inbound agents, go to *Manage Jenkins > Security* and set the agent port TCP port to **Disabled**.
3.  **Backups**: Regularly backup your `./data` (or named volume) directory. You can use backup cron jobs or snapshotting tools to safeguard Jenkins files.
