FROM node:alpine
COPY package.json package-lock.json /
# WORKDIR /react-frontend/
# COPY package.json /react-frontend/
RUN npm install
COPY . .
RUN npm run build
# CMD ["npm", "start"]

# CMD [ "executable" ]

# COPY src/ /react-frontend/src
