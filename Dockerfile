FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

# install pnpm
RUN npm install -g pnpm

RUN pnpm -v

RUN pnpm i

COPY . /usr/src/app

EXPOSE 9000

RUN pnpm db:seed

CMD [ "pnpm", "start" ]
