import {Pool} from "pg";

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

export default connect