# production environment
FROM nginx:alpine
COPY --from=docker.magical.rocks/dev-fancy-mumble:latest /my-app/build /usr/share/nginx/html
COPY --from=docker.magical.rocks/dev-fancy-mumble:latest /opt/start.sh /opt/start.sh
EXPOSE 80

# start app
CMD ["/opt/start.sh"]