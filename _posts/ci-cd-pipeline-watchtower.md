---
title: "CI/CD pipeline with Docker, Github actions and Dockerhub, and CD with Watchtower"
excerpt: "A CI/CD pipeline for the development phase"
coverImage: "/assets/blog/ci-cd-pipeline-watchtower/cover.jpg"
date: "2021-04-09T08:25:04.20Z"
author:
  name: Sudhanshu Ranjan
  picture: "/assets/blog/authors/me.jpg"
ogImage:
  url: "/assets/blog/ci-cd-pipeline-watchtower/cover.jpg"
---

I wanted to setup a CI/CD and deployment pipeline where my application would finally be deployed on my local machine while also using the sweet stuff that github provided with github-actions, _local-machine_ being the key here.

There can be many situations where you want the deployment to be local, particularly during the development phase, to:

- prevent network traffic
- non-transmission of sensitive data
- accommodate frequent changes in the code-base

##### _Note:_ This article requires you to have the atleast some prior knowledge of docker and github-actions, and docker installed on your local machine.

---

### 1. Dockerizing your application

> Docker is an open platform for developing, shipping, and running applications

Docker is like a VM but with only the parts necessary to run your applications. Docker provides a comprehensive guide on developing with docker in their documentation, which can be found [here](https://docs.docker.com/develop/).

To "dockerize" an app, you write a Dockerfile. Here's an example of a dockerfile.

```Dockerfile
# build environment
FROM node:12.2.0 as build
WORKDIR /app
COPY . /app
RUN npm install -g -s --no-progress yarn@1.x && \
  yarn && \
  yarn run build && \
  yarn cache clean

# nginx serve
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]
```

### 2. Setting up github actions for testing and CI

Once you have the dockerfile, you can build a docker image. A Docker image is a file, comprised of multiple layers, that is used to execute code in a Docker container. A docker image is basically a _packaged application_ that can be executed as _docker containers_. A docker container is just a running docker image.

Github actions provides an environment for executing "actions", which can perform various tasks. These actions are written as _yaml files_, which then execute based on github triggers like _pushing to a branch_, _initiating a pull-request_ etc. Check out the features of github actions [here](https://github.com/features/actions).

Dockerhub is an online registry where you can keep your docker images. You do require a dockerhub account to docker images up the registry. If you prefer, you can also make you own registry instead. More on this [here](https://docs.docker.com/registry/deploying/).

Below is an example _actions.yml_ file to build an image and push the image to the Dockerhub.

```Dockerfile
name: Dockerhub CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x, 14.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm test
        env:
          CI: true

      - name: Production Build and Push Docker image
        run: npm run ci:docker
        env:
          DOCKERHUB_USERNAME: ${{secrets.DOCKERHUB_USERNAME}}
          DOCKERHUB_PASSWORD: ${{secrets.DOCKERHUB_PASSWORD}}
        if: github.ref == 'refs/heads/main'
```

The example above uses a custom script `ci:docker` to build the docker-image, login into the dockerhub and push the image to the dockerhub using cli. The example is for a node app, but a similar approach can be used for any application.

### 3. Watchtower

The center part of this entire pipeline is _watchtower_.

> With watchtower you can update the running version of your containerized app simply by pushing a new image to the Docker Hub or your own image registry.

Basically, you run watchtower in your local machine, give it the container of your image to track, and, whenever that image gets updated in the registry (like Dockerhub), the container is updated with the latest changes.

Watchtower can be run with the following command:

```
$ docker run -d \
    --name watchtower \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower
```

Watchtower supports many configuration options. I will not be going deep into watchtower as their documentation explains every bits and pieces; refer to their official documentation for more information.

- [github repo](https://github.com/containrrr/watchtower)
- [documentation](https://containrrr.dev/watchtower/)

---

Doing these, you have successfully made your CI/CD pipeline which gets deployed and the container updated whenever changes are pushed to the github repo.
The local container takes some time to update once the updated image is pushed to the registry, but setting this whole workflow is simple and works beautifully, at least for the development environment.

---

### Credits:

- cover image by [Fotis Fotopoulos](https://unsplash.com/@ffstop)

---

This article was originally published to [dev.to](https://dev.to/tsuki42/ci-cd-pipeline-with-docker-github-actions-dockerhub-and-watchtower-3l3n)
