FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD starthub

COPY ./database/ /docker-entrypoint-initdb.d/
