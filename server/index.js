import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from 'morgan'
import bodyParser from "body-parser";
import dbConection from './dbConfig/index.js'

// secuity packages
import helmet from  "helmet"
dotenv.config()
const app=express()
const PORT =process.env.PORT || 8800

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json({limit: "10mn"}))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
dbConection()
app.listen(PORT,()=>{
    console.log(`Server running on port : http://localhost:${PORT}`)
})