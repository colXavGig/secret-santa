FROM node:20-slim
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Copy workspace package files
COPY backend/package.json ./backend/
COPY shared/package.json ./shared/

# Install dependencies (workspaces support)
RUN npm ci

# Copy the rest of the workspace
COPY backend ./backend
COPY shared ./shared

WORKDIR /app/backend

EXPOSE 5000

CMD ["npm", "start"]
