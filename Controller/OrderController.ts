import express from "express";
import {getMenuItems, insertMenuItem, insertOrder, deleteOrder} from "../Services/OrderService";

export async function GetMenuItems(req : express.Request,res : express.Response){
  const response = await getMenuItems();
  if (!response.success)
  {
      return res.status(404).send(response);
  }
  else{
    return res.status(200).send(response);
  }
};

export async function InsertMenuItem(req : express.Request, res : express.Response){
    const response = await insertMenuItem(req.body);
    if (!response.success)
    {
        return res.status(400).send(response);
    }
    else{
      return res.status(200).send(response);
    }
  };

export async function InsertOrder(req : express.Request, res : express.Response){
  const response = await insertOrder(req.body);
  if (!response.success)
  {
      return res.status(400).send(response);
  }
  else{
    return res.status(200).send(response);
  }
};

export async function DeleteOrder(req : express.Request, res : express.Response){
  const response = await deleteOrder(req.params.id);
  if (!response.success)
  {
      return res.status(400).send(response);
  }
  else{
    return res.status(200).send(response);
  }
};
