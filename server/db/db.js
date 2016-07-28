const Sequelize = require('sequelize');
const db = new Sequelize('dbeatup', 'root', 'mainstreet', {dialect: 'mysql'});
const bcrypt = require('bcrypt');

// Table models
const User = require('../api/user/user.model')(db, Sequelize);
const Restaurant = require('../api/restaurant/restaurant.model')(db, Sequelize);
const Eatup = require('../api/eatup/eatup.model')(db, Sequelize);
const Reservation = require('../api/reservation/reservation.model')(db, Sequelize);
const Comment = require('../api/comment/comment.model')(db, Sequelize);

// Connect to database
db.authenticate()
  .then((err) => {
    console.log('Connection has been established successfully.');
  }, (err) => {
    console.log('Unable to connect to the database:', err);
  });

// // EATUP Table - add foreign key creatorId to the Eatup model
Eatup.belongsTo(User, {foreignKey: 'creatorId', targetKey: 'id'});
Eatup.belongsTo(Restaurant, {foreignKey: 'restaurantId', targetKey: 'id'});

// // COMMENT Table - add foreign key userId to User eatupId to Eatup
Comment.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});
Comment.belongsTo(Eatup, {foreignKey: 'eatupId', targetKey: 'id'});

// RESERVATION Table - add foreign key userId to User eatupId and Eatup
User.belongsToMany(Eatup, { through: 'Reservation', foreignKey: 'userId' });
Eatup.belongsToMany(User, { through: 'Reservation', foreignKey: 'eatupId' });

// Synchronizing the schema

db.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(function(){
      return db.sync({ force: true });
  })
  .then(function(){
      return db.query('SET FOREIGN_KEY_CHECKS = 1')
  })
  .then(function(){
      console.log('Database synchronised.');
  }, function(err){
      console.log(err);
  });

// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.

module.exports = {
  User: User,
  Comment: Comment,
  Restaurant: Restaurant,
  Eatup: Eatup,
  Reservation: Reservation
}
