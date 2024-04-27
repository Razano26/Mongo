## MongoDB Data Center Simulation

## Overview

This repository contains all necessary scripts and configurations for setting up our simulated multi data center infrastructure using Docker. The `Infrastructure` directory is dedicated to orchestrating the deployment of MongoDB instances across multiple simulated servers and data centers.

For detailed refer to the documentation available in the [Infrastructure README](./Infrastructure/README.md).

## Quick Start

1. **Prerequisites**: Ensure Docker and Docker Compose are installed on your system.
2. **Starting the Environment**:
   - Navigate to the directory containing `docker-compose.yml`.
   - Run `./init-cluster.sh` to start and initialize the MongoDB cluster.

For more details, including how to shut down and clean up the environment, please consult the README in the `Infrastructure` directory.

## Import data from the CSV file to the Database

```bash
$ cd backend
$ npm run import
```