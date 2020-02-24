FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package*.json ./

RUN yarn

COPY . .

RUN ls /usr/src/app
RUN ls /usr/src/app/app/containers/Main

RUN yarn build

EXPOSE 80
ENTRYPOINT yarn serve
