import { Request, response, NextFunction } from "express"
import Data from "src/model/models"
// import db from '../repository/database'


const db = require("../repository/database")

// app.post('/app', async(req, res)=>{

//     try{
//     console.log("body: ",req.body)
//     await db.addPayable(req.body);
//     res.send('Gasto registrado.').sendStatus(201)

//     }catch{
//         console.error("Erro ao salvar no banco:");
//     res.status(500).json({ error: "Erro ao salvar no banco" });
//     }

// })

async function addPayable(req: any, res: any) {

    try {
        console.log("body: ", req.body)
        const result = await db.addPayable(req.body);

        console.log(result)

        if (!result) {
            return res.sendStatus(500)
        }

        return res.sendStatus(201)

    } catch {
        console.error("Erro ao salvar no banco:");
        res.status(500).json({ error: "Erro ao salvar no banco" });
    }

}
async function getAllPayable(req: Request, res: any) {

    try {
        const payables = await db.getAllPayable();
        console.log(typeof (payables))

        return res.json(payables)
    } catch {
        // res.status(500).json({ error: "Erro ao acessar no banco" });

    }

}



async function getPayableById(req: any, res: any) {


    try {
        const payable = await db.getPayableById(req.params.id)
        res.json(payable)
    } catch {
        console.error("Erro ao salvar no banco:");
        res.status(500).json({ error: "Erro ao salvar no banco" });
    }
}



async function updatePayable(req: any, res: any) {
    await db.updatePayable(req.params.id, req.body)
    res.send('Gasto atualizado.').sendStatus(200)
}

async function deletePayable(req: Request, res: any) {
    const result = await db.deletePayable(req.params.id)


    if (!result) {
        return res.send('usuário não encontrado').sendStatus(404)
    }

    return res.sendStatus(202)
}

export default {
    addPayable,
    getAllPayable,
    getPayableById,
    updatePayable,
    deletePayable
}