import {Router}  from "express";
import {con} from '../db/atlas.js';
import {limitGet} from '../limit/config.js';
import { ObjectId } from "mongodb";
const appCampus = Router();

appCampus.get('/',limitGet(),async(req,res)=>{
    console.log(req.rateLimit);
    if(!req.rateLimit) return;

    let {id} = req.body; 
    let db = await con();
    let usuario = db.collection("usuario");
    let result = await usuario.find({_id:new ObjectId(id)}).toArray();
    res.send(result);
});
export default appCampus;