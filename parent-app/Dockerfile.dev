FROM node:17-alpine3.14 AS development
WORKDIR /app/parent-app
COPY .npmrc ./
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN rm -f .npmrc
RUN chmod 777 /app/parent-app/node_modules
CMD ["npm", "start"]
