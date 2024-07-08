FROM node:18

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

ENV PORT 80

CMD [ "yarn","run", "start"]
