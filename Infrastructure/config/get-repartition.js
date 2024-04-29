const DB_NAME = process.env.DB_NAME;

db = db.getSiblingDB(DB_NAME);

console.log(db.bar.getShardDistribution());
console.log(db.cafe.getShardDistribution());
console.log(db.fast_food.getShardDistribution());
console.log(db.ice_cream.getShardDistribution());
console.log(db.pub.getShardDistribution());
console.log(db.restaurant.getShardDistribution());
// console.log(db.users.getShardDistribution());
// console.log(db.tags.getShardDistribution());
