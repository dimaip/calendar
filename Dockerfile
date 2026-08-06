FROM node:24-alpine

WORKDIR /usr/src/app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 80
CMD ["yarn", "serve"]
