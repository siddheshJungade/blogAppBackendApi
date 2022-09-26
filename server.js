import express from "express";
import bodyParser from "body-parser";
import router from "./router/router.js";
import 'dotenv/config'
import { routLog } from "./middelware/routLog.js";
import { db } from "./db/db.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

export const app = express();



app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())


app.use("/",routLog,router)

const port = process.env.PORT || 8000
app.listen(port,()=>{
    db()
    console.log(`Server is Runing on http://localhost:${port}`)
})