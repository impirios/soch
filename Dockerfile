FROM node:16

WORKDIR /usr/app

COPY ./dist ./


RUN npm cache clean -f

RUN rm -rf package-lock.json

RUN rm -rf node_modules

RUN npm install

RUN ls -a

EXPOSE 8081

CMD [ "npm","start"]
