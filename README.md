# NodeJS REST Express MongoDB

[![Build and Deploy to Kubernetes](https://github.com/febriyanadji/crud-nodejs/actions/workflows/github-actions-demo.yml/badge.svg)](https://github.com/febriyanadji/crud-nodejs/actions/workflows/github-actions-demo.yml)

Author : Febriyan Adji Saputro
postman url : https://documenter.getpostman.com/view/4794621/UzQvsQHT

## How to deploy on local machine for development purposes

```sh
git clone https://github.com/febriyanadji/crud-nodejs
cd crud-nodejs/
docker-compose up -d --build
```

Now, the API can be called from http://localhost:3000/

## How to deploy on Kubernetes Cluster

```sh
git clone https://github.com/febriyanadji/crud-nodejs
cd crud-nodejs/
kubectl apply -k ./kubernetes
```

Get the external IP :

```sh
kubectl get svc/crud-nodejs -n crud-nodejs
```

Now, the API can be called from http://externalIP/
