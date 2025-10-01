FROM oven/bun:alpine

RUN apk add --no-cache git

WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

RUN git --version

CMD ["bun", "start"]
