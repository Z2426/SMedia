import mongoose ,{Schema} from "mongoose";
//schema
const userSChema = new mongoose.Schema({
    firstName:{
        type:String,
        require :[true,"First name is require"]
    },
    lastName:{
        type:String,
        required:[true,'LatName is require']
    },
    email:{
        type:String,
        require:[true,["Email is require"]],
        unique:true
    },
    password :{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password length shoould  be greater then 6 character"],
        select : true 
    },
    location :{type:String},
    profileUrl:{type:String},
    professtion: {type: String},
    friends:[{
        type:Schema.Types.ObjectId, ref: "Users",   
    }],
    views:[{type:String}],
    verified:{type:Boolean,default:false}
},{
    timestamps:true
})
const Users = mongoose.model('Users', userSChema);
export default Users
