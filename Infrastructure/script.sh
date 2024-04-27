#!/bin/bash
echo "Waiting for MongoDB servers to start..."
sleep 10

echo "Initiating replica set for config servers..."
docker exec -it DC1-Config-srv mongo --port 27019 --eval "
rs.initiate({
    _id: 'configrs',
    configsvr: true,
    members: [
      { _id: 0, host: 'DC1-Config-srv:27019' },
      { _id: 1, host: 'DC2-Config-srv:27019' },
      { _id: 2, host: 'DC3-Config-srv:27019' }]
});
"

echo "Waiting for config replica set to initialize..."
sleep 10

echo "Initiating replica set for Shard 1..."
docker exec -it DC1-Shard1-srv mongo --port 27018 --eval "
rs.initiate({
    _id: 'shard1',
    members: [
      { _id: 0, host: "DC1-Shard1-srv:27018" },
      { _id: 1, host: "DC2-Shard1-srv:27018" },
      { _id: 2, host: "DC3-Shard1-srv:27018" }]
});
"

echo "Initiating replica set for Shard 2..."
docker exec -it DC1-Shard2-srv mongo --port 27020 --eval "
rs.initiate({
    _id: 'shard2',
    members: [
      { _id: 0, host: "DC1-Shard2-srv:27020" },
      { _id: 1, host: "DC2-Shard2-srv:27020" },
      { _id: 2, host: "DC3-Shard2-srv:27020" }]
});
"

echo "Initiating replica set for Shard 3..."
docker exec -it DC1-Shard3-srv mongo --port 27021 --eval "
rs.initiate({
    _id: 'shard3',
    members: [
      { _id: 0, host: "DC1-Shard3-srv:27021" },
      { _id: 1, host: "DC2-Shard3-srv:27021" },
      { _id: 2, host: "DC3-Shard3-srv:27021" }]
});
"

echo "Waiting for all replica sets to initialize..."
sleep 20

echo "Adding shards to the cluster..."
docker exec -it DC1-Mongos mongo --eval "
sh.addShard('shard1/DC1-Shard1-srv:27018,DC2-Shard1-srv:27018,DC3-Shard1-srv:27018');
sh.addShard('shard2/DC1-Shard2-srv:27020,DC2-Shard2-srv:27020,DC3-Shard2-srv:27020');
sh.addShard('shard3/DC1-Shard3-srv:27021,DC2-Shard3-srv:27021,DC3-Shard3-srv:27021');
"