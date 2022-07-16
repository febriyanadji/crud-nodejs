# NodeJS REST Express MongoDB

[![Build and Deploy to GKE](https://github.com/febriyanadji/crud-nodejs/actions/workflows/github-actions-demo.yml/badge.svg)](https://github.com/febriyanadji/crud-nodejs/actions/workflows/github-actions-demo.yml)

Author : Febriyan Adji Saputro

postman url : https://documenter.getpostman.com/view/4794621/UzQvsQHT

```sh
git clone https://github.com/febriyanadji/crud-nodejs
cd crud-nodejs/
docker-compose up -d --build
```

Access http://localhost:3000/

```sh
git clone https://github.com/febriyanadji/crud-nodejs
cd crud-nodejs/
kubectl apply -k ./kubernetes
```

```sh
kubectl get svc/crud-nodejs -n crud-nodejs
```

http://externalIP/
