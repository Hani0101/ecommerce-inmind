FROM node:20-alpine AS build
WORKDIR /app

RUN npm cache clean --force

COPY package.json package-lock.json ./
COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi

COPY --from=build /app/dist/ecommerce-inmind /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
