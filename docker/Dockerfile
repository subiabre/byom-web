FROM node:18-alpine

WORKDIR /app
EXPOSE 3000

COPY /package*.json ./

ARG NODE_ENTRYPOINT docker/entrypoint.sh
COPY $NODE_ENTRYPOINT /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

ENTRYPOINT ["/usr/local/bin/entrypoint"]
