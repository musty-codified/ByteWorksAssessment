FROM node:alpine3.18
WORKDIR /react-frontend/
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]


