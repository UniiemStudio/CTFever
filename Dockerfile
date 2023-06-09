FROM node:16-alpine as build-stage

WORKDIR /build
COPY . .

ENV CEVER_RUN_MODE=server
ENV CEVER_BACKEND_BASE=https://ctfever-service.uniiem.com

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk add --update --no-cache gcc g++ make cmake curl jq py3-configobj py3-pip py3-setuptools python3 python3-dev

RUN npm config set registry https://registry.npm.taobao.org && \
    yarn && yarn build

FROM node:16-alpine as production-stage

LABEL maintainer="hoshinosuzumi"
LABEL org.opencontainers.image.source="https://github.com/UniiemStudio/CTFever"
LABEL org.opencontainers.image.description="The official CTFever frontend image."

ENV CEVER_RUN_MODE=server
ENV CEVER_BACKEND_BASE=https://ctfever-service.uniiem.com

WORKDIR /app
COPY --from=build-stage /build .

EXPOSE 3000

CMD yarn start
