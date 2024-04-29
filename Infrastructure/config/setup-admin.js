const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

db = db.getSiblingDB('admin');
db.createUser
(
    {
        user: MONGO_USER,
        pwd: MONGO_PASSWORD,
        roles: [ 
          { role: 'clusterAdmin', db: 'admin' },
          { role: 'readWriteAnyDatabase', db: 'admin' },
          { role: 'userAdminAnyDatabase', db: 'admin' }
        ]
    }
);