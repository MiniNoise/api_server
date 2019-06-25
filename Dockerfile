FROM node:lts-jessie
EXPOSE 3001 9229

WORKDIR /app
COPY . .
RUN npm ci
RUN npm i -g nodemon
RUN npm i -g typescript
RUN npm i -g ts-node
RUN npm run build
