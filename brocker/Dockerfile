# base image
FROM node:13.8.0-alpine

# set working directory
WORKDIR /brocker

# add `/app/node_modules/.bin` to $PATH
ENV PATH /brocker/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./brocker/package.json ./package.json
COPY ./brocker/tsconfig.json ./tsconfig.json
RUN yarn install
COPY ./brocker  ./
RUN yarn run compile

# start app
CMD ["node", "./build/src/"]