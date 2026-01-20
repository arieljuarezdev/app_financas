import dotenv from "dotenv";
dotenv.config()

const PORT = parseInt(`${process.env.PORT || 3000}`)

import app from ".";

app.listen(PORT, () => console.log(`server running at port ${PORT}`))