"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auth_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Auth_type.hasMany(models.User);
    }
  }
  Auth_type.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Auth_Type",
    }
  );
  return Auth_type;
};
