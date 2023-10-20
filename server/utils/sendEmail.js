import nodemailer from "nodemailer"
import dotenv from "dotenv"
import {v4 as uuidv4} from "uuid"
import Verification from "../models/emailVerification"
import {hashString} from './index.js'
dotenv.config()
const {AUTH_EMAIL,AUTH_PASSWORD,APP_URL}=process.env
let transporter =nodemailer.createTransport({
    host:"smtp-mail.outlook.com",
    auth:{
        users: AUTH_EMAIL,
        pass:AUTH_PASSWORD
    }

})

export const sendVerificationEmail =async(user,res)=>{
  const {_id,email,lastName}=user
  const token= _id + uuidv4()
  const link= APP_URL +"users/verify/"+_id+"/"+token
  const mailOptions ={
    from : AUTH_EMAIL,
    to:email,
    subject:"EMAIL Verification",
    html :`<h1>Verify Email</h1>
    <p>Please press the link below to verify:</p>
    <a href="${link}">Click here to verify</a>`
  }
  try{
    const hashedToken =await hashString(token)
    const newVerifiedEmail =await Verification.create({
      userId:_id,
      token:hashedToken,
      createAt: Date.now(),
      expiresAt:Date.now()+3600000
    })
    if(newVerifiedEmail){
      transporter.sendMail(mailOptions)
      .then(()=>{
        res.status(201).send({
          success:"Pending",
          message:"Verification email has beem sent to yout accoung .check your email futher instruction"

        })
      }).catch((e)=>{
        console.log(e)
        res.status(404).json({message: "Something went wrong"})
      })
    }

  }catch(e){
    console.log(e)
    res.status(404).json({message:"Something went wrong"})
  }
}