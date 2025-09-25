FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm i --omit=dev

FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY package.json ./package.json
RUN npm i --omit=dev && npm cache clean --force
EXPOSE 4000
CMD ["node", "dist/index.js"]

