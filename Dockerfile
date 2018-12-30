#Create our image from Node 6.9-alpine
FROM node:6.9-alpine

#Create a new directory to run our app.
RUN mkdir -p /usr/src/app

#Set the new directory as our working directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# unsafe-perm needed for now 
RUN npm install -g rhizome-server --unsafe-perm=true
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Our app runs on port 8000. Expose it!
# Using 8001 with Docker to be able to test it separate from running the server outside of Docker
EXPOSE 8001:8000

# Specify UDP for OSC communication? 
# Same with OSC port 9001 outside of Docker maps to port 9000 used by rhizome
EXPOSE 9001:9000/UDP

# Run the application.
# CMD ["npm", "start"]
CMD ["rhizome", "config"]