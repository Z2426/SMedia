import mongoose ,{Schema} from "mongoose";
const emailVerificationSChema= Schema({
    userId:String,
    token:String,
    createAt:Date,
    expiresAt:Date
})
const Verification =mongoose.model("Verification",emailVerificationSChema)
export  default Verification