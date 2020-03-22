FROM node:erbium-slim

# change working directory
WORKDIR /usr/src/app

# copy package.json & package-lock.json (if available)
COPY package*.json ./

RUN npm install -g typescript

RUN tsc -v

# install dependencies
RUN npm install

# copy app
COPY . .

RUN npm run build

EXPOSE 3030

CMD [ "npm", "start" ]
