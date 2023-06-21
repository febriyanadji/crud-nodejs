FROM node:16.16-alpine3.16
WORKDIR /usr/src/app
COPY ./app/package*.json ./
RUN npm ci --only=production
COPY ./app .
EXPOSE 3000

CMD ["node", "index.js"]

