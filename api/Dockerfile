FROM node:alpine

RUN mkdir -p /srv/api

WORKDIR /srv/api

COPY package.json .

RUN npm install --quiet

COPY . .

VOLUME ["/srv/api"]

# start app
CMD ["npm", "run", "start:dev"]
