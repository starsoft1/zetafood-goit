
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 93
CMD ["npm", "start"]