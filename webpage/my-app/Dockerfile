# base image
FROM node:13.8.0-alpine

# set working directory
WORKDIR /my-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /my-app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install serve@11.3.0 -g
RUN npm install react-scripts@3.4.0 -g

COPY webpage/my-app/package.json ./package.json
RUN npm install --silent
COPY webpage/my-app/  ./
RUN npm run build

# start app
CMD ["serve", "-s", "/my-app/build"]