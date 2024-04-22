#!/bin/bash

# Wait for the MongoDB servers to start up
sleep 30

# Function to initiate replica set
initiate_replica_set() {
  local cfg_replica_set="$1"
  local members="$2"

  docker exec -it $cfg_replica_set mongosh --eval "
    rs.initiate({
      _id: 'configReplSet',
      configsvr: true,
      members: [${members}]
    })
  "
}

# Config servers initialization
initiate_replica_set "infrastructure-DC1CFG-1" "{ _id: 0, host: 'infrastructure-DC1CFG-1:27017' }, { _id: 1, host: 'infrastructure-DC2CFG-1:27017' }, { _id: 2, host: 'infrastructure-DC3CFG-1:27017' }"

# Wait for the config replica set to fully initialize
sleep 20

# Function to initiate shard replica set
initiate_shard_replica_set() {
  local srv="$1"
  local dc="$2"

  docker exec -it $srv mongosh --eval "
    rs.initiate({
      _id: 'dc${dc}',
      members: [{ _id: 0, host: '${srv}:27017' }]
    })
  "
}

# Initialize replica sets for each datacenter
for dc in 1 2 3; do
  for srv in 1 4; do # Changed to 4 since it appears you only have 4 servers per DC
    container_name="infrastructure-DC${dc}SRV${srv}-1"
    if [ $(docker ps -q -f name=${container_name} | wc -l) -eq 1 ]; then
      docker exec -it ${container_name} mongosh --eval "
      rs.initiate({
        _id: 'dc${dc}',
        members: [{ _id: 0, host: '${container_name}:27017' }]
      })
      "
    fi
  done
done

# Adding shards to the mongos router
docker exec -it infrastructure-mongos-1 mongosh --eval "
  sh.addShard('dc1/infrastructure-DC1SRV1-1:27017,infrastructure-DC1SRV2-1:27017,infrastructure-DC1SRV3-1:27017,infrastructure-DC1SRV4-1:27017');
  sh.addShard('dc2/infrastructure-DC2SRV1-1:27017,infrastructure-DC2SRV2-1:27017,infrastructure-DC2SRV3-1:27017,infrastructure-DC2SRV4-1:27017');
  sh.addShard('dc3/infrastructure-DC3SRV1-1:27017,infrastructure-DC3SRV2-1:27017,infrastructure-DC3SRV3-1:27017,infrastructure-DC3SRV4-1:27017');
"

# Verify that the sharding has been setup correctly
echo "Sharding setup completed. Check the logs above for any errors."
