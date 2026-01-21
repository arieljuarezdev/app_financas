import {Pool} from "pg";

export const pool = new Pool({
    host: "localhost",
    port: 5434,
    user: "ariel",
    password: "bacon",
    database: "app_financas"

})
