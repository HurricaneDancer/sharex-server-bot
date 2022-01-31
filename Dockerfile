FROM node 

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . . 

RUN node ./src/index.js 