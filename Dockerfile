FROM node:10

WORKDIR /root

COPY ./package.json /root/package.json
COPY ./package-lock.json /root/package-lock.json
RUN npm install

COPY ./dist /root/dist
COPY ./server /root/server

# start the server
CMD ["node", "/server/server.js"]