#!/bin/bash

source .env

# Setup keyfile for security inter node
echo "Setting up keyfile for security inter node..."
openssl rand -base64 756 > mongodb-keyfile
chmod 400 mongodb-keyfile

# Start MongoDB servers
echo "Starting MongoDB servers..."
NETWORK_NAME="mongo"
network_exists=$(docker network ls --filter name=^${NETWORK_NAME}$ --format "{{.Name}}")
if [ "$network_exists" == "$NETWORK_NAME" ]; then
    echo "Le réseau $NETWORK_NAME existe déjà."
else
    echo "Création du réseau $NETWORK_NAME."
    docker network create --driver bridge $NETWORK_NAME
fi
docker compose up -d
echo "Waiting for MongoDB servers to start..."
sleep 10

# Initiate replica set for config servers
echo "Initiating replica set for config servers..."
docker exec -it DC1-Config-srv mongosh --port 27019 --eval '
rs.initiate({
    _id: "configrs",
    configsvr: true,
    members: [
      { _id: 0, host: "DC1-Config-srv:27019" },
      { _id: 1, host: "DC2-Config-srv:27019" },
      { _id: 2, host: "DC3-Config-srv:27019" }]
});
'
echo "Waiting for config replica set to initialize..."
sleep 10

# Initiate replica set for Shard 1
echo "Initiating replica set for Shard 1..."
docker exec -it DC1-Shard1-srv mongosh --port 27018 --eval '
rs.initiate({
    _id: "shard1",
    members: [
      { _id: 0, host: "DC1-Shard1-srv:27018" },
      { _id: 1, host: "DC2-Shard1-srv:27018" },
      { _id: 2, host: "DC3-Shard1-srv:27018" }]
});
'

# Initiate replica set for Shard 2
echo "Initiating replica set for Shard 2..."
docker exec -it DC1-Shard2-srv mongosh --port 27020 --eval '
rs.initiate({
    _id: "shard2",
    members: [
      { _id: 0, host: "DC1-Shard2-srv:27020" },
      { _id: 1, host: "DC2-Shard2-srv:27020" },
      { _id: 2, host: "DC3-Shard2-srv:27020" }]
});
'
# Initiate replica set for Shard 3
echo "Initiating replica set for Shard 3..."
docker exec -it DC1-Shard3-srv mongosh --port 27021 --eval '
rs.initiate({
    _id: "shard3",
    members: [
      { _id: 0, host: "DC1-Shard3-srv:27021" },
      { _id: 1, host: "DC2-Shard3-srv:27021" },
      { _id: 2, host: "DC3-Shard3-srv:27021" }]
});
'
echo "Waiting for all replica sets to initialize..."
sleep 20

# Add shards to the cluster
echo "Adding shards to the cluster..."
docker exec -it DC1-Mongos mongosh --eval "
sh.addShard('shard1/DC1-Shard1-srv:27018,DC2-Shard1-srv:27018,DC3-Shard1-srv:27018');
"
docker exec -it DC1-Mongos mongosh --eval "
sh.addShard('shard2/DC1-Shard2-srv:27020,DC2-Shard2-srv:27020,DC3-Shard2-srv:27020');
"
docker exec -it DC1-Mongos mongosh --eval "
sh.addShard('shard3/DC1-Shard3-srv:27021,DC2-Shard3-srv:27021,DC3-Shard3-srv:27021');
"

# Create structure of the cluster
echo "Creating admin of the cluster..."
docker exec -it DC1-Mongos mongosh --file /etc/mongo/setup-admin.js

# Create sharded database
echo "Creating sharded database..."
docker exec -it DC1-Mongos mongosh -u $MONGO_USER -p $MONGO_PASSWORD --authenticationDatabase "admin" --file /etc/mongo/setup-cluster.js