'use strict';
import {Model} from "sequelize";
import {Sequelize} from "sequelize"

export = (sequelize: Sequelize, DataTypes:any) => {
  class MenuItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  MenuItem.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'MenuItem',
  });
  return MenuItem;
};