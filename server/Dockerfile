FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]