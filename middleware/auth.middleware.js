import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protectRoute = async (req,res,next)=>{
  try {
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({massage:"Unauthorized - No token provided"});
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({massage:"Unauthorized - Invalid token"});
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
      return res.status(404).json({massage:"User not found"});
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error is protectRoute middleware",error.massage);
    res.status(500).json({massage:"Internal server error"})
  }
};
