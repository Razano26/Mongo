# MongoDB Cluster Architecture Documentation

## Overview

This document provides a comprehensive overview of the MongoDB cluster architecture designed for high availability and scalability across three distinct data centers (DC1, DC2, and DC3). Each data center hosts a set of MongoDB servers configured as config servers, shard servers, and Mongos routers to manage a distributed database with high resilience and performance.

## Server Types Explained

In the MongoDB architecture, several types of servers play specific roles to ensure the smooth operation and high availability of the database:

- **Config Servers**: These servers store the metadata for the cluster, which includes information about the cluster's topology and the distribution of data across shards. The config servers are critical because they enable the Mongos routers to make intelligent decisions about where data resides and how to route queries. In our setup, each data center contains one config server to ensure redundancy and resilience.

- **Shard Servers**: Each shard contains a portion of the database's data, split across different servers for load balancing and redundancy. Every shard operates as a replica set, which means it consists of multiple copies that are kept in sync. This redundancy allows for failover protection: if one server in a shard fails, another can take over without loss of data or service.

- **Mongos Routers**: Mongos acts as the query routers of the MongoDB sharded cluster. They interface with client applications and direct operations to the appropriate shard(s) by consulting the config servers. Mongos routers make the cluster appear as a single database to the application, regardless of the number of shards in the background.

## Cluster Composition Overview

The MongoDB cluster is structured to ensure that each functional component contributes to the overall performance and reliability:

- **Three Data Centers**: Each designated as DC1, DC2, and DC3, to host the components of the cluster. This geographical distribution helps in reducing the risk of data loss and service disruption due to local failures.

- **Three Config Servers**: One in each data center (DC1-Config-srv, DC2-Config-srv, DC3-Config-srv). They synchronize to maintain a unified view of the cluster’s configuration and state.

- **Three Shards**: Each shard itself is divided across the three data centers for added redundancy and resilience. Each shard functions as a replica set:
  - **Shard 1**: Comprises DC1-Shard1-srv, DC2-Shard1-srv, DC3-Shard1-srv.
  - **Shard 2**: Comprises DC1-Shard2-srv, DC2-Shard2-srv, DC3-Shard2-srv.
  - **Shard 3**: Comprises DC1-Shard3-srv, DC2-Shard3-srv, DC3-Shard3-srv.

- **Three Mongos Routers**: One located in each data center (DC1-Mongos, DC2-Mongos, DC3-Mongos). They balance the load by routing queries to the appropriate shard based on the cluster configuration and the data requested.

This comprehensive setup not only enhances the cluster's ability to handle large volumes of data and high transaction rates but also ensures that the system can continue to operate efficiently even in the event of partial system failures.

### Architecture Diagram

Below is a tabular representation of the MongoDB infrastructure deployed across the three data centers:

##### Data Center 1 (DC1)

| **Type of Server** | **Server Name**  | **Description**                              |
|--------------------|------------------|----------------------------------------------|
| Config Server      | DC1-Config-srv   | Configuration server for DC1                 |
| Shard 1 Server     | DC1-Shard1-srv   | Part of the replica set for Shard 1          |
| Shard 2 Server     | DC1-Shard2-srv   | Part of the replica set for Shard 2          |
| Shard 3 Server     | DC1-Shard3-srv   | Part of the replica set for Shard 3          |
| Mongos             | DC1-Mongos       | Mongos router for query routing              |

##### Data Center 2 (DC2)

| **Type of Server** | **Server Name**  | **Description**                              |
|--------------------|------------------|----------------------------------------------|
| Config Server      | DC2-Config-srv   | Configuration server for DC2                 |
| Shard 1 Server     | DC2-Shard1-srv   | Part of the replica set for Shard 1          |
| Shard 2 Server     | DC2-Shard2-srv   | Part of the replica set for Shard 2          |
| Shard 3 Server     | DC2-Shard3-srv   | Part of the replica set for Shard 3          |
| Mongos             | DC2-Mongos       | Mongos router for query routing              |

##### Data Center 3 (DC3)

| **Type of Server** | **Server Name**  | **Description**                              |
|--------------------|------------------|----------------------------------------------|
| Config Server      | DC3-Config-srv   | Configuration server for DC3                 |
| Shard 1 Server     | DC3-Shard1-srv   | Part of the replica set for Shard 1          |
| Shard 2 Server     | DC3-Shard2-srv   | Part of the replica set for Shard 2          |
| Shard 3 Server     | DC3-Shard3-srv   | Part of the replica set for Shard 3          |
| Mongos             | DC3-Mongos       | Mongos router for query routing              |

## Benefits of the Chosen Architecture

- **High Availability:** By distributing each shard across three data centers, the cluster ensures continuous availability even in the event of a data center failure.
- **Scalability:** The architecture supports horizontal scalability. As demand increases, additional shards or replica sets can be added without significant downtime or performance degradation.
- **Disaster Recovery:** The use of replica sets across multiple data centers enhances the cluster's resilience to local disasters, providing robust disaster recovery capabilities.
- **Load Balancing:** Mongos routers distribute client requests across the shards, optimizing resource utilization and improving response times.

## Drawbacks

- **Complexity:** The setup involves complex configuration and management, especially when scaling out or performing maintenance.
- **Cost:** Operating multiple data centers increases infrastructure and operational costs.
- **Network Latency:** Geographical distribution can introduce latency, particularly if data centers are far apart or if the network infrastructure is inadequate.

## Conclusion

This architecture is designed to maximize uptime and performance for applications requiring high levels of data availability and quick access, regardless of geographical constraints. While it presents challenges in terms of complexity and cost, the benefits in reliability, scalability, and disaster recovery are substantial for enterprises needing robust database solutions.

## Cluster Management

### Starting the MongoDB Cluster
1. **Prerequisites**: Ensure Docker and Docker Compose are installed on your system.
2. **Move to the Infrastructure directory**: `cd Infrastructure`
3. **Configuration**: Copy the `.env.template` file as `.env` and adjust the usernames, passwords. `cp .env.template .env && nano .env`
4. **Starting the Environment**: Run `./init-cluster.sh` to start and initialize the MongoDB cluster.
5. **Accessing the MongoDB Shell**:
   - To access the MongoDB shell for a specific server, run `docker exec -it <container_name> mongo`.
   - For example, to access the shell of the Mongos router in Data Center 1, run `docker exec -it DC1-Mongos mongo`.
   - You can also access the shell of the config servers and shard servers using the same command.
   - To connect to a specific shard, use the `shard1`, `shard2`, or `shard3` database.
   
### Stopping and Cleaning Up
- **Stopping Containers**: To stop all services, use `docker-compose down`.
- **Cleanup**: To remove all persisted data and clean up your environment, execute `docker-compose down -v`.
- **Restarting the Cluster**: If you need to restart the cluster, run `./init-cluster.sh` again after stopping the containers.
