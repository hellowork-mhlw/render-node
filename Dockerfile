# Dockerfile
FROM node:20
WORKDIR /app

# Install dotenvx
RUN curl -fsS https://dotenvx.sh/ | sh
RUN apt-get update && apt-get install -y iputils-ping

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# Prepend dotenvx run
CMD ["dotenvx", "run", "--", "node", "index.js"]
