FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 80
ENTRYPOINT yarn serve
