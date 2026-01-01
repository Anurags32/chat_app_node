import User from "../model/user.model.js";
import Message from "../model/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async(req,res)=> {
    try {
    const LoggedInUserId = user._id;
    const fillterUser = await User.find({_id:{$ne:LoggedInUserId}}).select("-password");
    res.status(200).json(fillterUser);
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
        
    }
};

export const getMessage = async (req,res) => {
    try {
        const {id:userToChatId}=req.params;
        const myId = req.user._id;
        const message = await Message.find({
            $or:[
                {senderId:myId,reciverId:userToChatId},
                {senderId:userToChatId,reciverId:myId},
            ]
        });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
        
    }
};

export const sentMessage = async (req,res)=>{
    try {
        const {text,img}=req.body;
        const {id:resiverId} = req.params;
        const senderId = req.user._id;
        let imgeUrl;
        if(img){
            const uploadResponse = await cloudinary.uploader.upload(img);
            imgeUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,reciverId,text,imgUrl
        });
        await newMessage.save();
        // implement here soketio
        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
        
    }
};
