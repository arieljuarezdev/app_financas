import {Client, Pool} from "pg";
import Data from "src/model/models" ;

declare global {
    var connection: Pool | undefined;
}

export const pool = new Pool({
    host: "localhost",
    port: 5434,
    user: "ariel",
    password: "bacon",
    database: "app_financas"

})

async function connect(){

    // aplicação de Singleton (design pattern)
    if(global.connection){
        return global.connection.connect();
    }

    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0])
    client.release()

    global.connection = pool;
    
    return pool.connect()

}

connect()

async function addPayable(payable:Data) {

    // Validar preenchimento dos dados

    const client = await connect()

    const query = `insert into data_ctrl (namep, date, valuep) 
                    VALUES ($1, $2, $3)`;

    const values = [
        payable.name,
        payable.date,
        payable.value
    ]
    

    return await client.query(query,values)
}

async function getAllPayable() {

    // fazer validação se existem itens
    const client = await connect();
    const res = await client.query('SELECT * FROM data_ctrl')

    return res.rows
} 

async function getPayableById(id: number){

    //fazer validação de ID, se é existe de fato
    const client = await connect();
    const res = await client.query('SELECT * FROM data_ctrl WHERE ID=$1', [id])

    return res.rows

}

async function updatePayable(id: number, pay: Data){

    //validar ID
    const client = await connect();
    const query = 'UPDATE data_ctrl SET namep = $1, date = $2, valuep = $3 WHERE ID = $4'
    const values = [
        pay.name,
        pay.date,
        pay.value,
        id
    ]
    return await client.query(query, values)

}

async function deletePayable(id:number) {
    const client = await connect();
    return await client.query('DELETE FROM data_ctrl WHERE ID = $1', [id])
}

module.exports = {addPayable, getAllPayable, getPayableById, updatePayable, deletePayable}


export default connect