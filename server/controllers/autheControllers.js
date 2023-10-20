import Users from "../controllers/userModel.js"
import { hashString } from "../utils/index.js"
import { sendVerificationEmail } from "../utils/sendEmail.js"
export const register =async(req,res,next)=>{
    const {firstName, lastName,email,password} =req.body
    if(!(firstName || lastName||email||password)){
        next("Provide require fields")
        return
    }try{
        const userExist = await Users.findOne({email})
        if(userExist){
            next("Email adress adready exists")
        
            return
        }
        const hashPassword =await hashString(password)
        const user = await Users.create({
            firstName,
            lastName,
            email,
            password:hashPassword
        })
        //send email vetigication to user
        sendVerificationEmail(user,res)

    }catch(e){
        console.log(e)
        res.status(400).json({message: e.message})
    }
}
export const login =async(req,res,next)=>{
    const {email,password} =req.body
    try{
        //validation
        if(!email || !password){
            next("Please Provude User credentials")
            return
            
        }
        //find user by email
        const user =await Users.findOne({email}.select(
        "+password"
        ).populate({
            path: "friends",
            select :"firstName  LastName location profileUrl -passord"

        })
        )
        if(!user){
            next("Invalid email or password")
            return
        }
        if(!user?.verified){
            next(
                "Üser email is  not verified.check your email account and verify your email"
            )
            return
        }
        //compare password
        const isMatch =await compareString(password,user?.password)
        if(!isMatch){
            next("Invalid email or password")
            return
        }
        user.password=undefined
        const token =createJWT(user?._id)
        res.status(201).json({
            success : true,
            message : "Login successfully",
            user,
            token

        })

    }catch(e){
        console.log(e)
        res.status(400).json({message: e.message})
    }
}