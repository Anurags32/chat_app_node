import { required } from "joi";
import mongoose, { Mongoose }  from "mongoose";
const userSchema= new Mongoose.Schema({
    email:{type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        unique:true,

    },
    profile:{
        type:String,
        default:"",
    }
},{timestamps:true});

const user= mongoose.model("User",userSchema);

export default user;


