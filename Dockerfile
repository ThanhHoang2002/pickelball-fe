FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app

# Define build arguments
ARG VITE_BASE_URL
ARG VITE_CHAT_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_CHAT_URL=$VITE_CHAT_URL
ENV NODE_ENV=production

# Copy lock file for fetch
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# Copy source and install
COPY . .
RUN pnpm install --offline
RUN pnpm build

FROM node:lts-alpine
WORKDIR /app
RUN npm install -g serve

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy only the built app
COPY --from=build /app/dist /app

EXPOSE 3000
CMD ["serve", "-s", "/app", "-l", "3000"]