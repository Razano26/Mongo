const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;

db = db.getSiblingDB(DB_NAME);
db.createUser({
    user: DB_USER,
    pwd: DB_USER_PASSWORD,
    roles: [{role: 'readWrite', db: DB_NAME}]
});

db.bar.createIndex({ id: 'hashed' });
sh.shardCollection('mtp_open_data.bar', { id: 'hashed' });

db.cafe.createIndex({ id: 'hashed' });
sh.shardCollection('mtp_open_data.cafe', { id: 'hashed' });

db.fast_food.createIndex({ id: 'hashed' });
sh.shardCollection('mtp_open_data.fast_food', { id: 'hashed' });

db.ice_cream.createIndex({ id: 'hashed' });
sh.shardCollection('mtp_open_data.ice_cream', { id: 'hashed' });

db.pub.createIndex({ id: 'hashed' });
sh.shardCollection('mtp_open_data.pub', { id: 'hashed' });

db.restaurant.createIndex({ id: 'hashed' });
sh.shardCollection('mtp_open_data.restaurant', { id: 'hashed' });

db.users.createIndex({ id: 'hashed' });
sh.shardCollection('mtp_open_data.users', { id: 'hashed' });

db.tags.createIndex({ id: 'hashed' });
sh.shardCollection('mtp_open_data.tags', { id: 'hashed' });
