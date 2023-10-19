import mongoose,{Schema} from "mongoose";
const passordResetSchema =Schema({
    userId:{type:String,unique:true},
    email:{type:String, unique:true},
    token: String,
    createAt: Date,
    expiresAt: Date

})
const PasswordReset =mongoose.model("PasswordRest")
export default PasswordReset