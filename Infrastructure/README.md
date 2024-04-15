# Infrastructure Configuration Guide

## Docker Compose Setup

This guide details the Docker Compose setup used to simulate a network of data centers containing multiple MongoDB servers. Below is a schematic representation of our setup:

### Data Center Structure

Below is the layout of our simulated datacenters:

| Datacenter 1  | Datacenter 2  | Datacenter 3  |
|---------------|---------------|---------------|
| DC1-Server1   | DC2-Server1   | DC3-Server1   |
| DC1-Server2   | DC2-Server2   | DC3-Server2   |
| DC1-Server3   | DC2-Server3   | DC3-Server3   |
| DC1-Server4   | DC2-Server4   | DC3-Server4   |
| DC1-Server5   | DC2-Server5   | DC3-Server5   |


### `docker-compose.yml` Overview

```yaml
version: '3.8'
services:
  dc1-server1:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - "27017:27017"
    volumes:
      - dc1-server1-data:/data/db
    networks:
      - mongo-cluster

  dc1-server2:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - "27018:27017"
    volumes:
      - dc1-server2-data:/data/db
    networks:
      - mongo-cluster

# Continue with similar configurations for other servers across all data centers

volumes:
  dc1-server1-data:
  dc1-server2-data:
  # Define other volumes similarly

networks:
  mongo-cluster:
    driver: bridge
```

### Setup Instructions

1. **Prerequisites**: Ensure Docker and Docker Compose are installed on your system.
2. **Starting the Environment**:
   - Navigate to the directory containing `docker-compose.yml`.
   - Execute `docker-compose up -d` to launch all services.
3. **Status Check**:
   - Run `docker-compose ps` to verify that all containers are up and running.

## Managing the Environment

- **Stopping Containers**: To stop all services, use `docker-compose down`.
- **Cleanup**: To remove all persisted data and clean up your environment, execute `docker-compose down -v`.

This guide enables you to simulate a distributed data center infrastructure and practice large-scale MongoDB database management. For further questions or additional support, consult the official Docker and MongoDB documentation.