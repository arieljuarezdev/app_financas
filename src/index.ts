import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'
import morgan from "morgan";
import helmet from "helmet";


require("dotenv").config();
const db = require("./repository/database")

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet())
app.use(express.json())

// app.use((req: Request, res: Response, next: NextFunction)=>{
//     // res.send("hello world!!!")
// })

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    res.status(500).send(err.message)
})

app.get('/', (req, res)=>{
    res.json({msg: 'funciona'})
})

app.post('/payable', async(req, res)=>{
    
    try{
    console.log("body: ",req.body)
    await db.addPayable(req.body);
    res.sendStatus(201)

    }catch{
        console.error("Erro ao salvar no banco:");
    res.status(500).json({ error: "Erro ao salvar no banco" });
    }
    
})

app.get('/all', async (req, res)=>{
    
    try{
        const customers = await db.getAllPayable();
        res.json(customers);
    }catch{
        console.error("Erro ao salvar no banco:");
    res.status(500).json({ error: "Erro ao salvar no banco" });
    }
})

app.listen(3000)

export default app

