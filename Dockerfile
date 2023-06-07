FROM node:16-alpine as build-stage

WORKDIR /build
COPY . .

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk add --update --no-cache gcc g++ make cmake curl jq py3-configobj py3-pip py3-setuptools python3 python3-dev

RUN yarn install && \
    yarn run build

FROM node:16-alpine as production-stage

LABEL maintainer="hoshinosuzumi"
LABEL org.opencontainers.image.source=https://github.com/UniiemStudio/CTFever

ENV CEVER_RUN_MODE=server
ENV CEVER_BACKEND_BASE=https://ctfever-service.uniiem.com

WORKDIR /app
COPY --from=build-stage /build .

EXPOSE 3000

CMD yarn start
