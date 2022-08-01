FROM node:14.15.0
RUN mkdir /project
WORKDIR /project
COPY package.json /project/package.json
RUN npm i 
COPY ./ /project
ENTRYPOINT [ "npm", "start" ]
