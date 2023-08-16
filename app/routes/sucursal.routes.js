import { Router } from "express";
import { limitGet } from "../middleware/limit.js";
import { allSucursal } from "../controllers/sucursal.js";

const appSucursal = Router();
 
appSucursal.get('/', limitGet(), allSucursal);

export default appSucursal;