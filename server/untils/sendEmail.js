import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { v4 as uuidv4 } from 'uuid';
import Verification from "../models/emailVerification.js"
import {hashString} from './index.js'
dotenv.config()
const {AUTH_EMAIL,AUTH_PASSWORD,API_URL}=process.env
let transporter =nodemailer.createTransport({
    host :"smtp-mail.outlook.com",
    authe :{
        user:AUTH_EMAIL,
        pass:AUTH_PASSWORD,
    }
})
export const sendVerificationEmail =async(user, res)=>{
    const {_id,email,lastName} =user
    const token =_id+uuidv4()
    const link =API_URL +"users/verify/"+_id+"/"+ token
    const mailOptions ={
        from : AUTH_EMAIL,
        to:email,
        subject :"Email Verification",
        html :`<div style ='font-family : Arial,sans-serif; font-size:28px ;color:#333';
        background-color:
        <h1 style="color:rgb(8,56,188)">Please  verify your email address</h1>
        <hr>
        <h4>Hi ${lastName}</h4>
        <p>
         Pleasse verify your email address so we can know that it ready you
         <br>
         <p>This link <b>expires in 1 hourse </b></p>
         <br>
         <a href=${link} style="color:#fff;padding:14px;text-decoration:none;background-color: #000"> 
         Email address</a>
         <div style="margin-top : 20px">
         <h5>Best Regrads</h5>
         <h5>ShareFun Team</h5>
         </div>

        `

    }
    try {
        const hashedToken =await hashString(token)
        const newVerifieldEmail = await Verification.create({
            userId:_id,
            token:hashedToken,
            createAt:DataTransfer.now(),
            expiresAt: Date.now()+360000

        })
        if(newVerifieldEmail){
            transporter.sendMail(mailOptions)
            .then(()=>{
                res.status(201).send({
                    success:"PENDING",
                    message:"Verification email has been sent to yout account .Check your email"
                })
            })
            .catch((e)=>{
                console.log(e)
                res.status(404).json({messag: "SOmething went err"})
            })
        }

    }catch(e){
        console.log(e)
        res.status(404).json({message:"Something  went wrong"})
    }
}