import { IOrder } from "../Interfaces/IOrder";
import response from "../models/Response";
import { IMenuItem } from "../Interfaces/IMenuItem";
import  db  from "../models/index";
const Orders = db.Orders;
const MenuItems = db.MenuItems;

export async function insertMenuItem(menuItem : IMenuItem) {
    try {
      const res = await Orders.create(menuItem).catch((err:any) => {throw err;});
      if(res == null)
      {
        return new response(null, false, "Insert UnSuccessful!");
      }
        return new response(res, true, "Insert Successful!");

    } catch (error) {
      return new response(null, false, "error caught! : "+ error);
    }
  }

export async function getMenuItems() {
  try {
    const items = await MenuItems.findAll().catch((err:any) => {throw err;});
    if (items.length === 0) {
      return new response(null, false, "items empty!");
    }
    return new response(items, true, "get Items successful!");
  } catch (error) {
    return new response(null, false, "error caught! : " + error);
  }
}

export async function insertOrder(order : IOrder) {
  try {
    const res = await Orders.bulkCreate(order).catch((err:any) => {throw err;});
    console.log(res);
    if(res == null)
    {
      return new response(null, false, "Insert UnSuccessful!");
    }
      return new response(res, true, "Insert Successful!");

  } catch (error) {
    return new response(null, false, "error caught! : "+ error);
  }
}

export async function deleteOrder(id : string) {
    try {
        const deleted = await Orders.destroy({where:{id}}).catch((err:any) => {throw err;});
      if(deleted)
      {
        return new response(deleted, true, "delete Successful!");
      }
    } catch (error) {
      return new response(null, false, "delete Unsuccessful! : "+ error);
    }
  }
