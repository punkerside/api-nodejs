PROJECT = nodejs
SERVICE = api

DOCKER_UID  = $(shell id -u)
DOCKER_GID  = $(shell id -g)
DOCKER_USER = $(shell whoami)

base:
	docker build -t ${PROJECT}-${SERVICE}:base -f docker/base/Dockerfile .
	docker build -t ${PROJECT}-${SERVICE}:build --build-arg IMG=${PROJECT}-${SERVICE}:base -f docker/build/Dockerfile .

build:
	echo ''"${DOCKER_USER}"':x:'"${DOCKER_UID}"':'"${DOCKER_GID}"'::/app:/sbin/nologin' > passwd
	docker run --rm -u "${DOCKER_UID}":"${DOCKER_GID}" -v "${PWD}"/passwd:/etc/passwd:ro -v "${PWD}"/app:/app ${PROJECT}-${SERVICE}:build
	docker build -t ${PROJECT}-${SERVICE}:latest --build-arg IMG=${PROJECT}-${SERVICE}:base -f docker/latest/Dockerfile .

run:
	docker-compose up

stop:
	docker-compose down