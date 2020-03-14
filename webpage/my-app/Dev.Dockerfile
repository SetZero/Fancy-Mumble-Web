# base image
FROM node:13.8.0-alpine

# set working directory
WORKDIR /my-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /my-app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN yarn global add serve@11.3.0
RUN yarn global add react-scripts@3.4.0

COPY webpage/my-app/start.sh /opt/start.sh
RUN chmod +x /opt/start.sh

COPY webpage/my-app/package.json ./package.json
RUN yarn install
COPY webpage/my-app/  ./
RUN npm run build