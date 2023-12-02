# Use the base image with Node.js installed
FROM node:14-alpine
RUN apk add g++ make py3-pip

# Set the working directory to /frontend
WORKDIR /backend

# Copy the package.json and package-lock.json files to the container
COPY package.json ./

RUN npm install -g node-gyp
RUN npm install winston
# Install the dependencies
RUN python --version
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Run tests during the build process
RUN npm test

# Expose the port that the application will run on
EXPOSE 8082

# Start the backend server
CMD ["npm", "start"]