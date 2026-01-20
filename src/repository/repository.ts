import {Pool} from "pg";
import Data from "src/model/models";

export const pool = new Pool({
    host: "localhost",
    port: 5434,
    user: "ariel",
    password: "bacon",
    database: "app_financas"

})
