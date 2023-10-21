import Users  from "../models/userModel.js"
import { compareString, createJWT, hashString } from "../untils/index.js"
import { sendVerificationEmail } from "../untils/sendEmail.js"
export const register =async(req,res,next)=>{
    const {firstName, lastName,email,password} =req.body
    //validare filed
    if(!(firstName || lastName || email||password)){
        next("Provide required fields")
        return
    }
    try{
        const userExits = await Users.findOne({email})
        if(userExits){
            next("Email adress adready exists")
            return
        }
        const hasshedPassword = await hashString(password)
        const user =await Users.create({
            firstName,
            lastName,
            email,
            password:hasshedPassword
        })
        //send email vetification 
        sendVerificationEmail(user,res)

    }catch(e){
        console.log(e)
        res.status(404).json({message :e.message})
    }
}
export const login =async(req,res,next)=>{
    const {email,password} =req.body
    try{
        //validation
        if(!email || !password){
            next("Please Provide User Credetials")
            return
        }
        //find user by email 
        const user =await Users.findOne({email}).select("+password")
        .populate({
            path:"friends",
            select:"firstName lastName location profileUrl -password"
        })
        if(!user){
            next("Invalid email or password")
            return
        }
        if(!user?.verified){
            next(
                "User email is not verified.check your email account and verifu your  email"
            )
            return
        }
        //compare password
        const isMatch =await compareString(password,user?.password)
        if(!isMatch){
            next("Invalid email or password")
            return
        }
        user.password =undefined
        const token =createJWT(user?._id)
        res.status(201).json({
            success: true,
            message:"Login successfully",
            user,
            token
          
        })
    }catch(e){
        console.log(e)
        res.status(404).json({message: e.message})
    }
}