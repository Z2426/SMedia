import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
export const hashString =async (useValue)=>{
    const salt =await bcrypt.genSalt(10)
    const hashedpassword =await bcrypt.hash(useValue,salt)
    return hashedpassword
}
export const compareString =async (userPassord,password)=>{
    const isMatch =await bcrypt.compare(userPassord,password)
    return isMatch
}
//JSON WEBTOKEN
export function createJWT(id){
    return JWT.sign({userId:id},process.nextTick.JWT_SERECT_KEY,{
        expiresIn:"1d"
    })

}