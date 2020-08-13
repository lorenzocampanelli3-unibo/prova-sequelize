'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
            foreignKey: {
            name: 'author',
            allowNull: false
          }
       });
    }
  };
  Post.init({
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: {
          tableName: 'Users'
        },
        key: 'userId'
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false
  });
  return Post;
};