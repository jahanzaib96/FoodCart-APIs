import  bcrypt from "bcrypt";
import crypto from "crypto";
import  response from "../models/Response";
import jwt from "jsonwebtoken";
import {  validationResult } from 'express-validator';
import { IUser } from "../Interfaces/IUser";
import express from "express";
import  db  from "../models/index";
// const db = dbo.models;
const Users = db.Users;
let secretKey: string;
const maxAge = 60 * 60 * 2;

export async function userExist(email:string) {
     const user = await Users.findOne({where:{email}
    }).catch((err:any)=>{throw err;});
     return user;
}

async function verifyPassword(enteredPassword:string, passwordHash:string) {
  console.log(passwordHash);
  const validPassword = await bcrypt.compare(enteredPassword, passwordHash);
  if (validPassword) {
    return true;
  }
  return false;
}

 const createToken = (userId:string) => {
  secretKey = crypto.randomBytes(35).toString("hex");
  const accessToken = jwt.sign (
    {
      id: userId,
    },
    secretKey,
    {
      expiresIn: maxAge,
    }
  );
  return accessToken;
};

  export async function validateToken (req : express.Request, res : express.Response, next : express.NextFunction) {
    try {
        const authHeader = await req.headers.authorization;
        if(authHeader == null){
            return res.status(401).send(new response(null, false, "token empty!"));
        }
        const accessToken = authHeader && authHeader.split(" ")[1];
        jwt.verify(accessToken, secretKey, (err) => {
          if (err) {
           return res.status(401).send(new response(null, false, "Not authorized! : " + err));
          }
          next();
        });
    } catch (err) {
       return res.status(500).send(new response(null, false, "Authorization failed! : " + err));
    }
};

 export function validateCredentials(req : express.Request, res : express.Response, next : express.NextFunction) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).send({ success: false, message: errors.array() });
   }
   next();
 }

 export async function register(data : IUser) {
  try {
    const user = await userExist(data.email);
    if (!(user == null)) {
      return new response(null, false, " Email Already Exist!");
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);
    const users = await Users.create({ email: data.email, password }).catch((err:any) => {
      throw err;
    });
    // if (res == null) {
    //   return new response(null, false, "Add UnSuccessful!");
    // }
    return new response(users.toJSON().email, true, "User "  + " Added Successfuly!");
  } catch (error) {
    return new response(null, false, "error caught! : " + error);
  }
}

 export async function login(data : IUser) {
  try {
    const user = await userExist(data.email);
    if (user == null) {
      return new response(null, false, "Email not exist!");
    }
     else if (!(await verifyPassword(data.password, user.password))) {
       return new response(null, false, "incorrect Password!");
     } else {
      return new response(createToken(user.id), true, "login successful!");
    }
  } catch (error) {
    return new response(null, false, error + " Authentication Failed!");
  }
}
// }