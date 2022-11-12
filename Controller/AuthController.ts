import express from "express";
import {register, login} from "../Services/AuthService";

  export async function signup(req: express.Request, res: express.Response) {
    const response = await register(req.body);
    if (!response.success) {
      return res.status(401).send(response);
    } else {
      return res.status(200).send(response);
    }
  }

  export async function signin(req: express.Request, res: express.Response) {
    const response = await login(req.body);
    if (!response.success) {
      return res.status(401).send(response);
    } else {
      return res.status(200).send(response);
    }
  }
