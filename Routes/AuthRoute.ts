import  express from "express";
const router = express.Router();
import { body } from 'express-validator';
import { validateCredentials } from "../Services/AuthService";
import {signin,signup} from "../Controller/AuthController";

router.route("/signup").post(body('email').isEmail().isLength({min:15}), body('password').notEmpty().matches(/^[A-Za-z0-9 .,'!&]+$/).isLength({min: 8}), validateCredentials, signup);
router.route("/login").post(signin);

export default router;