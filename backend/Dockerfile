FROM node:18.18-alpine3.18
WORKDIR /app
RUN mkdir /data
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node" ,"app.js" ]

