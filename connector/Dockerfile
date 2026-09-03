#https://medium.com/@vitthalchandankar2/creating-a-dockerfile-for-a-spring-boot-application-a-step-by-step-guide-237e84bb37b6

FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock* ./
RUN yarn install

COPY . .

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 CMD test -f /tmp/healthy || exit 1

CMD ["node", "receiver.js"]