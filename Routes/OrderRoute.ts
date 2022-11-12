import  express from "express";
const router = express.Router();
import {GetMenuItems,InsertOrder,DeleteOrder, InsertMenuItem} from "../Controller/OrderController";

router.route("/MenuItems").get(GetMenuItems);
router.route("/insertMenuItems").get(InsertMenuItem);
router.route("/insertOrder").post(InsertOrder);
router.route("/deleteOrder/:id").delete(DeleteOrder);

export default router;