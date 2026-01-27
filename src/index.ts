import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'
import morgan from "morgan";
import helmet from "helmet";
import route from "./router/router";

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet())
app.use(express.json())

require("dotenv").config();
const db = require("./repository/database")
app.use('/app/', route)

export default app

