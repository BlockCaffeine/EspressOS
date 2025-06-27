FROM node:22.17.0-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:22.17.0-alpine
RUN corepack enable
WORKDIR /app
COPY --from=builder /app/build build/
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]