FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bullseye 

# Required for Playwright
RUN apt-get update && apt-get install -y \
    libnspr4 \
    libnss3 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon0 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpulse0 \
    && rm -rf /var/lib/apt/lists/*                                    

# Install Deno 
ENV DENO_INSTALL=/home/node/deno
RUN mkdir -p ${DENO_INSTALL}
ENV DENO_DIR=${DENO_INSTALL}/.cache/deno
ENV PATH=${DENO_INSTALL}/bin:${PATH}
RUN curl -fsSL https://deno.land/x/install/install.sh | sh 

# Install Deno Deploy CLI
RUN deno install -fA jsr:@deno/deployctl --global

# Ensure the node user owns the Deno installation
RUN chown -R node ${DENO_INSTALL}
RUN chgrp -R node ${DENO_INSTALL}

USER node

RUN npm install -g npm@latest
RUN npm install -g playwright
RUN npx -y playwright install chromium
RUN npx -y playwright install chrome --with-deps
