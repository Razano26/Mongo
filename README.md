# MongoDB Project

## Overview

This project aims to create a MongoDB database for a restaurant and bar management system. The system will store information about various establishments, such as their name, location, type, opening hours, and services offered. The database will be designed to support complex queries and aggregations to provide valuable insights to the users.

## Project Roadmap

- **Data Source**: Download the data for Montpellier establishments from the provided website, making sure to avoid direct use of the JSON format due to issues with null fields and non-compliance with a non-relational database schema.
- **Data Analysis**: Explore the CSV file to understand the structure and available fields. Identify fields containing null values and those relevant to your application.
- **Schema Design**: Decide how to structure the data in MongoDB, considering creating a collection for each type of establishment (bar, restaurant, etc.).
- **Data Cleaning**: Develop scripts to clean the data and prepare it for import into MongoDB.
- **Data Import**: Import the cleaned data into the MongoDB collections.
- **Index Creation**: Define indexes on fields that will be frequently queried to improve query performance.
- **Transactions**: Implement transactions to manage operations that require atomic modifications across multiple documents or collections.
- **REST API**: Develop a REST API in Node.js to perform basic CRUD operations as well as more complex queries (aggregations, transactions).
- **Aggregations**: Create aggregation queries to provide statistics or information, such as a list of establishments with Wi-Fi or bars ranked by opening hours.
- **API Testing**: Use the Requests library in Python or your browser to test the various API routes.
- **Deployment**: Implement clustering and sharding strategies to manage data distribution and scalability.
- **Load Testing**: Perform load tests to ensure the robustness and performance of your solution.
- **Documentation**: Document the architecture, design choices, and API endpoints.
- **Final Presentation**: Prepare a presentation to showcase your work, describing how the client's needs were met and how the system can evolve.

## Setup

In the following sections, we will guide you through the setup process for the MongoDB database and the REST API.
You will be asked to copy some env files, if you don't change any value in the env files, the default values will be used and it's work but it's not recommended, you should change the values to secure your database and your API.

### MongoDB Data Center Simulation

#### Overview

This repository contains all necessary scripts and configurations for setting up our simulated multi data center infrastructure using Docker. The `Infrastructure` directory is dedicated to orchestrating the deployment of MongoDB instances across multiple simulated servers and data centers.

For detailed refer to the documentation available in the [Infrastructure README](./Infrastructure/README.md).

#### Quick Start

1. **Prerequisites**: Ensure Docker and Docker Compose are installed on your system.
2. **Move to the Infrastructure directory**
3. **Configuration**: Copy the `.env.template` file as `.env` and adjust the usernames, passwords.
4. **Starting the Environment**: Run `init-cluster.sh` to start and initialize the MongoDB cluster.

```bash
$ cd Infrastructure
$ cp .env.template .env
$ ./init-cluster.sh
```

For more details, including how to shut down and clean up the environment, please consult the README in the `Infrastructure` directory.

### Import data and start the API

#### Overview

The `backend` directory contains the Node.js application that serves as the REST API for the MongoDB database and a script to import the data into the database. The API provides endpoints for performing CRUD operations on the establishments and running complex queries using MongoDB's aggregation framework.

#### Quick Start

1. **Prerequisites**: Ensure Node.js and npm are installed on your system.
1. **Move to the backend directory**
1. **Configuration**: Copy the `.env.template` file as `.env` and adjust the database connection string, username, and password.
1. **Install Dependencies**: Run `npm install` to install the required packages.
1. **Import Data**: Run `npm run import` to import the data from the CSV file into the MongoDB database.
1. **Start the API**: Run `npm run start` to start the API server.
1. **Access the API**: Open a browser and navigate to `http://localhost:3000` to access the API.
1. **Test the API**: Use tools like ApiDog or cURL to test the different API endpoints.

```bash
$ cd backend
$ cp .env.template .env
$ npm install
$ npm run import
$ npm run start
```

## Deployments on servers

In this repository, we have included what you need to deploy the mongoDB cluster and the API on a servers. You can find the necessary scripts in the `Infrastructure` directory and the `backend` directory.

The folowing commands will help you to deploy the mongoDB cluster and the API on servers. All services are deployed using Docker.
After the deployment, you can access the API using the IP address of the server and the port 3014 and the mongoDB cluster using the IP address of the server and the port 27017. For authentication, you can use the username and password that you have set in the `.env` file, the admin or the user defined for use the database seted.

We have included an other service for provide the documentation of the API. You can access the documentation using the IP address of the server and the port 3012.

```bash
cd Infrastructure
cp .env.template .env
./init-cluster.sh
cd ../backend
docker-compose up -d # If you dont want to start the documentation service you can use docker-compose up -d service_api
```

Now you can use the folowing urls to access the services:
- API: http://IP_SERVER:3014
- Documentation: http://IP_SERVER:3012
- MongoDB: mongodb://IP_SERVER:27017


## Contributors

- [Thomas Broine](https://github.com/thomasbroine)
- [Louis Labeyrie](https://github.com/Razano26)
- [chatGPT](https://chat.openai.com)