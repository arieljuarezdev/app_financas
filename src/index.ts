import { pool } from "./repository/repository";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'
import morgan from "morgan";
import helmet from "helmet";

async function main(){
    const result = await pool.query('SELECT NOW()');
    console.log("Postgres conectado: ", result.rows[0])
    await pool.end()
}

main().catch(console.error)



const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet())
app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction)=>{
    res.send("hello world!!!")
})

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    res.status(500).send(err.message)
})

export default app;