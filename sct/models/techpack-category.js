'use strict';
const { Model } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
  class TechpackCategory extends Model {
    static associate(models) {
      models.TechpackCategory.hasMany(models.Techpack, {
        foreignKey: 'categoryId'
      });
      models.TechpackCategory.hasMany(models.TechpackSubCategory, {
        foreignKey: 'categoryId',
        as :'sub_category'
      });
    }
  }
  TechpackCategory.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TechpackCategory'
  });
  return TechpackCategory;
};