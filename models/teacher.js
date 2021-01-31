'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teacher.hasMany(models.Course);
      Teacher.belongsTo(models.User);
    }
  }
  Teacher.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Teacher',
    }
  );
  return Teacher;
};
