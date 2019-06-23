FROM node:8.12.0
COPY . /home/app
WORKDIR /home/app
COPY package.json ./
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]