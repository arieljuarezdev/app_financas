import { pool } from "./repository/repository";

async function main(){
    const result = await pool.query('SELECT NOW()');
    console.log("Postgres conectado: ", result.rows[0])
    await pool.end()
}

main().catch(console.error)