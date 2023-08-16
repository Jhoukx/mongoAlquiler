import { con } from '../../config/connection/atlas.js';

let db = await con();
let contrato = await db.collection('Contrato');

const availableAutomovil = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    let result = await contrato.aggregate([
        {
            $lookup: {
                from: "Automovil",
                localField: "ID_Automovil",
                foreignField: "ID",
                as: "AutomovilesDeAlquiler"
            }
        },
        {
            $match: {
                Estado: "Disponible"
            }
        },
        {
            $project: {
                _id: 0,
                "AutomovilesDeAlquiler._id": 0
            }
        }
    ]).toArray();
    res.send(result);
}

const activeAlquiler = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    let result = await contrato.aggregate([
        {
            $match: {
                Estado: "Activo"
            }
        },
        {
            $lookup: {
                from: "Cliente",
                localField: "ID_Cliente",
                foreignField: "ID",
                as: "Cliente"
            }
        },
        {
            $project: {
                "Cliente._id": 0,
                ID_Cliente: 0,
                Fecha_Fin: 0,
                Fecha_Inicio: 0,
                _id: 0
            }
        }
    ]).toArray();
    res.send(result);
}

const pendingClienteYAutomovil = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    let result = await contrato.aggregate([
        {
            $match: {
                Estado: "Pendiente"
            }
        },
        {
            $lookup: {
                from: "Cliente",
                localField: "ID_Cliente",
                foreignField: "ID",
                as: "Cliente"
            }
        },
        {
            $lookup: {
                from: "Automovil",
                localField: "ID_Automovil",
                foreignField: "ID",
                as: "Automovil"
            }
        },
        {
            $project: {
                "Cliente._id": 0,
                "Automovil._id": 0,
                ID_Cliente: 0,
                ID_Automovil: 0,
                _id: 0,
                Fecha_Inicio: 0,
                Fecha_Fin: 0
            }
        }
    ]).toArray()
    res.send(result);
}
export { availableAutomovil, activeAlquiler, pendingClienteYAutomovil };