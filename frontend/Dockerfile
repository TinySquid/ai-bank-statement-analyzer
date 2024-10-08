FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev", "--host", "0.0.0.0"]
