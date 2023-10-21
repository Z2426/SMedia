import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken"
export const hashString= async (useValue)=>{
    const salt = await bcrypt.genSalt(10)
    const hasshedPassword =await  bcrypt.hash(useValue,salt)
    return hasshedPassword

}
export const compareString =async(userPassord,password)=>{
    const isMatch =await bcrypt.compare(userPassord,password);
    return isMatch
}
//JSON WEBTOKEN
export function createJWT(id){
    return JWT.sign({userId:id},process.env.JWT_SECRET_KEY,{
        expiresIn :"1d"
    })
}
