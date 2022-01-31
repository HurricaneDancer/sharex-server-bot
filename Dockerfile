FROM node 

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . . 

CMD ["node", "./src/index.js"]