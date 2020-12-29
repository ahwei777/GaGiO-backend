"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Unit.belongsTo(models.Course);
      Unit.belongsTo(models.Teacher);
    }
  }
  Unit.init(
    {
      CourseId: DataTypes.INTEGER,
      TeacherId: DataTypes.INTEGER,
      unit_list: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Unit",
    }
  );
  return Unit;
};
