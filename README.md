# NodeJS REST Express MongoDB

[![Build and Deploy to Kubernetes](https://github.com/febriyanadji/crud-nodejs/actions/workflows/github-actions-demo.yml/badge.svg)](https://github.com/febriyanadji/crud-nodejs/actions/workflows/github-actions-demo.yml)

Author : Febriyan Adji Saputro

## How to deploy on local machine for development purposes

Run the following command :

```sh
git clone https://github.com/febriyanadji/crud-nodejs
cd crud-nodejs/
docker-compose up -d --build
```

Now, the API can be called from http://localhost:3000/

## How to deploy on Kubernetes Cluster

Run the following command :

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

## API Documentation

Postman URL : https://documenter.getpostman.com/view/4794621/UzQvsQHT

## API Login credentials

| Username | Password | Admin |
| -------- | -------- | ----- |
| admin    | 123      | true  |
| user1    | 123      | false |

## Login Flow

POST request to /auth/login using username & password and get the access token

use the access token as a Bearer Authorization Header to access protected endpoints

## CRUD Flow

Admin user has permission to Create Read Update Delete all users

non-admin users only have permission to read their profile data via the /auth/me endpoint
