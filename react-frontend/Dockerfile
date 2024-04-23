FROM node:alpine3.18
WORKDIR /react-frontend/
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]

#Nginx is commonly used for reverese proxying due to its performance and flexibility in handling HTTP requests.
## Serve stage
#FROM nginx:1.23-alpine
#WORKDIR /usr/share/nginx/html
#RUN rm -rf *
#COPY --from=build /app/build .
#EXPOSE 3000
#
## Start Nginx
#CMD ["nginx", "-g", "daemon off;"]



# Copy the custom nginx.conf file to the container
#COPY ./react-frontend/.docker/nginx.conf /etc/nginx/nginx.conf

# Copy the built React app from the build stage to the nginx container
#COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
