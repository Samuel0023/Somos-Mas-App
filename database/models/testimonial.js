'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Testimonial.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: 'Testimonial',
  });
  return Testimonial;
};