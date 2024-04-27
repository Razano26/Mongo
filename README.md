# MongoDB Project

## Overview

This project aims to create a MongoDB database for a restaurant and bar management system. The system will store information about various establishments, such as their name, location, type, opening hours, and services offered. The database will be designed to support complex queries and aggregations to provide valuable insights to the users.

## Project Roadmap

- **Data Source**: Download the data for Montpellier establishments from the provided website.
- **Data Analysis**: Explore the CSV file to understand the structure and available fields. Identify fields with null values and those relevant to your application.
- **Schema Design**: Decide how to structure the data in MongoDB. Consider creating a collection for each type of establishment (bar, restaurant, etc.).
- **Data Cleaning**: Write scripts to clean the data and prepare it for import into MongoDB.
- **Data Import**: Import the cleaned data into the MongoDB collections.
- **Index Creation**: Define indexes on fields that will be frequently queried to improve query performance.
- **Transactions**: Implement transactions to handle operations that require modification of multiple documents or collections atomically.
- **REST API**: Develop a REST API in Node.js to perform basic CRUD operations and more complex queries (aggregations, transactions).
- **Aggregations**: Create aggregation queries to provide statistics or information, such as the list of establishments with Wi-Fi or bars ranked by opening hours.
- **API Testing**: Use the Requests library in Python or your browser to test the different API routes.
- **Deployment**: Implement clustering and sharding strategies to manage data distribution and scalability.
- **Load Testing**: Perform load tests to ensure the robustness and performance of your solution.
- **Documentation**: Document the architecture, design choices, and API endpoints.
- **Final Presentation**: Prepare a presentation to showcase your work, describing how the client's needs were met and how the system can evolve. 

## MongoDB Data Center Simulation

### Overview

This repository contains all necessary scripts and configurations for setting up our simulated multi data center infrastructure using Docker. The `Infrastructure` directory is dedicated to orchestrating the deployment of MongoDB instances across multiple simulated servers and data centers.

For detailed refer to the documentation available in the [Infrastructure README](./Infrastructure/README.md).

### Quick Start

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
