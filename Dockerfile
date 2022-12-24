FROM node:16

WORKDIR /usr/app

COPY ./ ./


RUN npm cache clean -f

RUN rm -rf package-lock.json

RUN rm -rf node_modules

RUN npm install --legacy-peer-deps

RUN ls -a

EXPOSE 8081

CMD [ "npm","start"]
