FROM node:latest
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml .husky ./
RUN pnpm install
COPY src/ src/
COPY index.html vite.config.ts tsconfig.json .eslintrc.yml ./
RUN pnpm run build
EXPOSE 5000
CMD ["pnpm", "run", "serve", "--", "--host"]
