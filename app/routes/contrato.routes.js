import { Router } from "express";
import { con } from '../config/connection/db/atlas.js';
import { limitGet } from "../app/middleware/limit.js";
const appContrato = Router();

appContrato.get('/', limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    let db = await con();
    let contrato = db.collection("Contrato");
    let result = await contrato.find({ Estado: "Disponible" }, { _id: 0 }).toArray();
    res.send(result);
});

export default appContrato;