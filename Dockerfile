FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]
COPY ["package-lock.json", "./"]

RUN npm install

COPY .. .

CMD [ "npm", "start" ]
