import { Router } from "express";
import { con } from '../../config/connection/atlas.js';
import { limitGet } from '../middleware/limit.js';
const appCampus = Router();

appCampus.get('/', limitGet(), async (req, res) => {
    console.log(req.rateLimit);
    if (!req.rateLimit) return;

    let { id } = req.body;
    let db = await con();
    let usuario = db.collection("usuario");
    let result = await usuario.find({}, { _id: 0 }).toArray();
    res.send(result);
});

appCampus.post('/', async (req, res) => {
    if (!req.rateLimit) return;
    let db = await con();
    let usuario = db.collection("usuario");
    try {
        let result = await usuario.insertOne(req.body);
        console.log(result);
        res.send('Insert Successfully');
    } catch (error) {
        console.log(error);
        res.send('Insert unsuccesfully')
    }
})
export default appCampus;