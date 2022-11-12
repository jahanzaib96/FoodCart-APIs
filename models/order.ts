'use strict';
import {Model} from "sequelize";
import {Sequelize} from "sequelize"

export = (sequelize:Sequelize, DataTypes:any) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  Order.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};