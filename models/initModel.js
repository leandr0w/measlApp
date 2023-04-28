const Meals = require('./meals.model');
const Restaurant = require('./restaurant.model');

const initModel = () => {
  Restaurant.hasMany(Meals, { foreignKey: 'restaurantId' });
  Meals.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
};

module.exports = initModel;
