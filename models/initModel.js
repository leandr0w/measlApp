const Meal = require('./meal.model');
const Order = require('./order.model');
const Restaurant = require('./restaurant.model');
const Review = require('./review.model');
const User = require('./user.model');

const initModel = () => {
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
  Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

  User.hasMany(Review, { foreignKey: 'id' });
  Review.belongsTo(User, { foreignKey: 'id' });

  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  Meal.hasOne(Order, { foreignKey: 'mealId' });
  Order.hasOne(Meal, { foreignKey: 'mealId' });
};

module.exports = initModel;
