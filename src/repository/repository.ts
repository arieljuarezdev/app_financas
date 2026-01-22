import Data from "../model/models";
import connect from "./database";

// add - POST - C
// getId - GET - R
// getAll - GET - R
// update - PATCH - U
// delete - DELETE - D

const conn = global.connection

async function addPayable(payable:Data) {
    const client = await connect()
    const query = 'INSERT INTO data_ctrtl(nameP, date, valueP) VALUES ($1, $2, $3 )';
    const values = [payable.name, payable.date, payable.value]

    return await client.query(query, values)
}

module.exports = {addPayable}
