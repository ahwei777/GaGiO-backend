"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Teacher);
      Course.hasMany(models.Cart_item);
      Course.hasMany(models.Paid_course);
      Course.hasOne(models.Unit);
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      TeacherId: DataTypes.INTEGER,
      isPublic: DataTypes.BOOLEAN,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
