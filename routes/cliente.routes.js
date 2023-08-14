import { Router } from 'express'; 
import { con } from '../db/atlas.js';
import { limitGet } from '../limit/config.js';

const appCliente = Router();


appCliente.get('/', limitGet(),async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    
    let db = await con();
    let cliente = db.collection("Cliente");
    let result = await cliente.find({}).toArray();
    res.send(result);
});

export default appCliente;