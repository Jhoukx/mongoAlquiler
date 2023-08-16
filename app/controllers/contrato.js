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
    let valor = req.query.Estado
    
    let result = await contrato.aggregate([
        {
            $match: {
                Estado: valor
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

const idAlquiler = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const id = Number(req.params.id)
    let result = undefined

    if (req.query.Costo_Total === undefined) {
        result = await contrato.find({ ID: id }, { _id: 0 }).toArray();
    } else {
        result = await contrato.aggregate([
            {
                $match: {
                    ID: id
                }
            },
            {
                $project: {
                    Costo_Total: 1,
                    _id: 0
                }
            }
        ]).toArray()
    }

    console.log(`result:\t${result}`);
    res.send(result);
}
export { availableAutomovil, activeAlquiler, pendingClienteYAutomovil, idAlquiler };