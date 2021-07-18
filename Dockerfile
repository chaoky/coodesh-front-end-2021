FROM node:latest as bundler
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml .husky ./
RUN pnpm install
COPY src src
COPY public public
COPY tsconfig.json .eslintrc.yaml craco.config.js ./
RUN pnpm run build

# https://github.com/SirCremefresh/spa-server
FROM donatowolfisberg/spa-server as builder
COPY --from=bundler /app/build public
RUN ./build.sh

FROM scratch
COPY --from=builder /app/server /server
EXPOSE 8080
CMD ["/server"]
