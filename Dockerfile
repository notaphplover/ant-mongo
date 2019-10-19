FROM node:12.11.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet

COPY . .

CMD [ "npm", "run", "build"]
