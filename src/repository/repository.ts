import Data from "../model/models";
import connect from "./database";

// add - POST - C
// getId - GET - R
// getAll - GET - R
// update - PATCH - U
// delete - DELETE - D

// async function addPayable(payable:Data) {

//     console.log("payable: ", payable)

//     const client = await connect()
//     const query = 'INSERT INTO data_ctrl(namep, date, valuep) VALUES ($1, $2, $3 )';
//     const values = [payable.name, payable.date, payable.value]

//     return await client.query(query, values)
// }

// async function getAllPayable() {
//     const client = await connect();
//     const res = await client.query('SELECT * FROM data_ctrl')

//     return res.rows
// }

// module.exports = {addPayable, getAllPayable}
