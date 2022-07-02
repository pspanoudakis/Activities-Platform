FROM node:17-alpine3.14 AS development
WORKDIR /app/admin-app
COPY .npmrc ./
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN rm -f .npmrc
RUN chmod 777 /app/admin-app/node_modules
CMD ["npm", "start"]
