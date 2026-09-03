'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Demanda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Demanda.init({
    idpk: DataTypes.STRING,
    type: DataTypes.STRING,
    packageBody: DataTypes.JSONB,
    receivedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Demanda',
  });
  return Demanda;
};