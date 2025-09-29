FROM oven/bun:alpine

RUN apk add --no-cache git

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN git --version

CMD ["bun", "start"]
