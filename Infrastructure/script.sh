#!/bin/bash
echo "Waiting for MongoDB servers to start..."
sleep 10

echo "Initiating replica set for config servers..."
docker exec -it infrastructure-configsvr-1 mongo --port 27019 --eval "
rs.initiate({
  _id: 'configrs',
  configsvr: true,
  members: [{ _id: 0, host: 'infrastructure-configsvr-1:27019' }]
});
"

echo "Waiting for config replica set to initialize..."
sleep 10

echo "Initiating replica set for Shard 1..."
docker exec -it infrastructure-shard1svr-1 mongo --port 27018 --eval "
rs.initiate({
  _id: 'shard1',
  members: [{ _id: 0, host: 'infrastructure-shard1svr-1:27018' }]
});
"

echo "Initiating replica set for Shard 2..."
docker exec -it infrastructure-shard2svr-1 mongo --port 27020 --eval "
rs.initiate({
  _id: 'shard2',
  members: [{ _id: 0, host: 'infrastructure-shard2svr-1:27020' }]
});
"

echo "Waiting for all replica sets to initialize..."
sleep 20

echo "Adding shards to the cluster..."
docker exec -it infrastructure-mongos-1 mongo --eval "
sh.addShard('shard1/infrastructure-shard1svr-1:27018');
sh.addShard('shard2/infrastructure-shard2svr-1:27020');
"
