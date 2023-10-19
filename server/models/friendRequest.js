import mongoose,{Schema} from "mongoose";
const reqestSchema=Schema({
   requestto:{type:Schema.Types.ObjectId, ref:"Users"},
   requestFrom :{type:Schema.Types.ObjectId,ref:"Users"},
   requestStatus:{ type:String,default :"Pending"}
},{
    timestamps:true
})
const FriendRequest =mongoose.model("Friend")
export default FriendRequest