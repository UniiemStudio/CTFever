FROM node:14-alpine as build-stage
ADD . /build_dir

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk add --update --no-cache  gcc g++ make cmake curl jq py3-configobj py3-pip py3-setuptools python3 python3-dev

RUN cd /build_dir \
  && yarn install \
  && yarn run build \
  && yarn run generate \
  && mv dist /dist

FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
