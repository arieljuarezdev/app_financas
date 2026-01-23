import {Pool} from "pg";
import Data from "src/model/models";

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

    // console.log("payable: ", payable)

    const client = await connect()

    console.log(typeof(payable.name))
    console.log(payable.date)
    console.log(payable.value)


    // const values = [payable.name, payable.date, payable.value]
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
    const client = await connect();
    const res = await client.query('SELECT * FROM data_ctrl')

    return res.rows
} 

module.exports = {addPayable, getAllPayable}


export default connect