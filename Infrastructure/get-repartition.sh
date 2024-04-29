#!/bin/bash

source .env

docker exec -it DC1-Mongos mongosh -u $MONGO_USER -p $MONGO_PASSWORD --authenticationDatabase "admin" --file /etc/mongo/get-repartition.js