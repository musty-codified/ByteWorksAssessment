FROM node:alpine3.18
WORKDIR /react-frontend/
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

