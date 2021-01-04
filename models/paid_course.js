'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paid_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Paid_course.belongsTo(models.User)
      Paid_course.belongsTo(models.Course)
    }
  };
  Paid_course.init({
    UserId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER,
    amountPaid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Paid_course',
  });
  return Paid_course;
};