FROM node:20-slim
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Copy workspace package files
COPY frontend/package.json ./frontend/
COPY shared/package.json ./shared/

# Install dependencies (workspaces support)
RUN npm ci

# Copy the rest of the workspace
COPY frontend ./frontend
COPY shared ./shared

WORKDIR /app/frontend

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
