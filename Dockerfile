FROM node:lts-jessie

LABEL author="Arnaud (Martient) Leherpeur"
LABEL version="1.0.0"

EXPOSE 3000 9229

RUN mkdir /app

WORKDIR /app

COPY . .

RUN apt-get install libpq-dev g++ make -y
RUN npm install --no-optional
RUN npm i pg-native
RUN chmod +x run.sh

RUN npm ci
