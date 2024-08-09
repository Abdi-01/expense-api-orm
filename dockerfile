FROM node:18

RUN npm install -g nodemon

# Set project directory in docker container
WORKDIR /app

# Copy file from local directory to WORKDIR
COPY package.json .
COPY . .

RUN npm i

# EXPOSE app PORT to host OS
EXPOSE 2400

# Store node_modules in volume
VOLUME ["/app/node_modules"]

# Running app command
CMD [ "npm", "run", "dev" ]