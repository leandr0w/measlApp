const Meal = require('./meal.model');
const Restaurant = require('./restaurant.model');

const initModel = () => {
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
};

module.exports = initModel;
