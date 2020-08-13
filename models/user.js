'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
          foreignKey: {
          name: 'author',
          allowNull: false
        }
      });
    }
  };
  User.init({
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      lastName:{
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      }
    }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};