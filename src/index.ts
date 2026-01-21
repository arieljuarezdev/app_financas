import { pool } from "./repository/database";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'
import morgan from "morgan";
import helmet from "helmet";
import { Pool } from "pg";

declare global {
    var connection: Pool | undefined;
}

async function connect(){

    // aplicação de Singleton (design pattern)
    if(global.connection){
        return global.connection.connect();
    }

    const client = await pool.connect();
    console.log("conectou com postgresql")

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0])
    client.release()

    global.connection = pool;


    return pool.connect()

}

connect()



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