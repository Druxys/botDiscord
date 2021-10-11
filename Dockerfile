FROM node:16.10.0
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]
COPY ["package-lock.json", "./"]

RUN npm install

COPY .. .

CMD [ "npm", "start" ]
