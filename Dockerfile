FROM node:10-alpine
RUN mkdir -p /srv
WORKDIR /srv
COPY package.json /srv
COPY package-lock.json /srv
ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN
RUN apk --update add --no-cache bash && \
  apk --update add --no-cache --virtual build-dependencies python make g++ && \
  echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc && \
  npm ci --only=production && \
  apk del build-dependencies && \
  rm -Rf ~/.npm
COPY . /srv
EXPOSE 3000
CMD ["./scripts/start.sh"]