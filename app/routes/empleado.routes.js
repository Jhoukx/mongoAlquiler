import { Router } from "express";
import { limitGet } from "../middleware/limit.js";
import cargoEmployee from "../controllers/empleado.js";


const appEmpleado = Router();

appEmpleado.get('/', limitGet(), cargoEmployee);

export default appEmpleado;