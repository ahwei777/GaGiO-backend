'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_item.belongsTo(models.Order);
      Order_item.belongsTo(models.Course);
    }
  };
  Order_item.init({
    OrderId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER,
    amountPaid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_item',
  });
  return Order_item;
};