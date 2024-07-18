# syntax=docker/dockerfile:1

FROM node:20.11.1-alpine AS base

WORKDIR /usr/src/app


FROM base AS build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

RUN npm run build


FROM base AS final

ENV NODE_ENV=production

USER node

# Use the official nginx image as the base
FROM nginx:alpine

# Remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the build directory (your static files) to the nginx container
COPY --from=build /usr/src/app/build /usr/share/nginx/html/

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80

# The base image nginx:alpine contains a CMD instruction that starts nginx for us, so we don't need to add it explicitly

# NOTE: To make this Docker container work with nginx, we have to remove the next line from the package.json file:
# "homepage": "https://RafaelCasillas100.github.io/recipes",
