import mongoose  from "mongoose";
const dbConection = async()=>{
    try{
        const connect =await mongoose.connect(process.env.MONGODB_URL,{
            useNewURLParser :true,
            //useUnifliedTopology:true

        })
        console.log("DB connected succesfully")
    }catch(e){
        console.log("DB error"+e)
    }
}
export default  dbConection