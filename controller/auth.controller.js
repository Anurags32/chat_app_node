import bcrypt from 'bcryptjs';
import router from '../routes/auth.routes.js';
import User from '../model/user.model.js';

    
export const signup = async (req,res)=>{
   const{fullName,email,password}=req.body;
  try {
     if(!fullName || !email || !password){
    return res.status(400).json({Massage:"All fields are requried"})
   } 
   if(password.length<6){
    return res.status(400).json({Massage:"Password must be atleast 6 charecter long"});

   }
   const user = await User.findOne({email});
   if(!user){
    return res.status(400).json({Massage:"User not exit"});
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
}

   } catch (error) {
    
  }
};
export const login = async (req,res)=>{};
export const logout = async (req,res)=>{};
export const updateProfile = async (req,res)=>{};

