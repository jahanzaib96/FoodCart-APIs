'use strict';

import fs from 'fs';
import path from'path';
import {Sequelize, DataTypes} from 'sequelize';
import process from 'process';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import userModel from "../models/user";
import orderModel from "../models/order";
import menuItemModel from "../models/menuitem";

console.log(env);
// tslint:disable-next-line: no-var-requires
// const config = require(__dirname + '/../config/config.json')[env];
// import config = from path.join(__dirname, '..', 'config', 'config.json')[env];
const db = Object();
let sequelize : Sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
sequelize = new Sequelize("postgres", "postgres", process.env.DBPASS, {
  host: "localhost",
  dialect: "postgres",
});
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach(file => {
    // tslint:disable-next-line: no-var-requires
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = userModel(db.sequelize, DataTypes);
db.Orders = orderModel(db.sequelize, DataTypes);
db.MenuItems = menuItemModel(db.sequelize, DataTypes);

export default db;



// import { Sequelize } from "sequelize";
// import userModel from "./User";
// import orderModel from "./Order";
// import menuItemModel from "./MenuItems";

// const sequelize = new Sequelize("postgres", "postgres", process.env.DBPASS, {
//     host: "localhost",
//     dialect: "postgres",
//   });

// const db = Object();
// function definePostgres()
// {
//     try {
//         sequelize.authenticate();
//         db.sequelize = sequelize;
//         db.Users = userModel(sequelize);
//         db.Orders = orderModel(sequelize);
//         db.MenuItems = menuItemModel(sequelize);
//         db.sequelize.sync({ force: false }).then(() => {
//           console.log("Drop and re-sync db.");
//         });
//         return db;
//     } catch (error){
//         console.log("Db issues : "+error);
//     }
// }

// export default definePostgres;
