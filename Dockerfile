FROM reg.aichallenge.ir/front:16.52.75

ENV APP_ROOT /src

RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
