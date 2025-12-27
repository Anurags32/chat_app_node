import bcrypt from 'bcryptjs';
import router from '../routes/auth.routes.js';
import User from '../model/user.model.js';
import { generateToken } from '../utils/utils.js';

    
export const signup = async (req,res)=>{
   const{fullName,email,password}=req.body;
  try {
     if(!fullName || !email || !password){
    return res.status(400).json({massage:"All fields are requried"})
   } 
   if(password.length<6){
    return res.status(400).json({massage:"Password must be atleast 6 charecter long"});

   }
   const user = await User.findOne({email});
   if(!user){
    return res.status(400).json({massage:"User not exit"});
   }

   const salt = await bcrypt.genSalt(10);

   const hasPassword = await bcrypt.hash(password,salt);
   const newUser = new User({
    fullName,
    email,
    password:hasPassword,
   });

   if(newUser){
    generateToken(newUser._id,res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profile: newUser.profile,
    });
}else{
  res.status(400).json({massage:"Invalid user data"});
}

   } catch (error) {
    console.log("error is signup controller",error.massage);
    res.status(500).json({massage:"Internal server error"})
  }
};
export const login = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({massage:"User not exit"});
    }
    const password = await bcrypt.compare(password,user.passwor);
    if(!password){
      return res.status(400).json({massage:"User not exit"})
    }
    generateToken (user._id,res);
    res.status(200).json({
       _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profile: user.profile,
    })
  } catch (error) {
    console.log("error is login controller",error.massage);
    res.status(500).json({massage:"Internal server error"})
  }
};
export const logout = async (req,res)=>{
  try {
    res.clearCookie("token");
    res.status(200).json({massage:"Logout success"});
  } catch (error) {
    console.log("error is logout controller",error.massage);
    res.status(500).json({massage:"Internal server error"})
  }
};
export const updateProfile = async (req,res)=>{
  try {
    const {profilePic}=req.body;
    const userId = req.user._id;
    if(!profilePic){
      return res.status(400).json({massage:"Profile pic is requried"});
    }

  } catch (error) {
    
  }
};

