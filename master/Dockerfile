#https://medium.com/@vitthalchandankar2/creating-a-dockerfile-for-a-spring-boot-application-a-step-by-step-guide-237e84bb37b6

FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json yarn.lock* ./

RUN yarn install

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 CMD curl -f http://localhost:3000/health || exit 1

CMD ["yarn", "start"]