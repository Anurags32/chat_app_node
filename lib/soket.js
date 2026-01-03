import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5001"],
        credentials:true,
    }
});
export function getRecevierSoketId(userId){
return userSoketMap[userId];
}
const userSoketMap = {};
io.on("connection",(soket)=>{
    console.log("soket connection done");
    // here get by user id
    const userId = soket.handshake.query.userId;

    if(userId) userSoketMap[userId] = soket.id;

    // io.emit() is used to send event to all connected user;

    // this emit is used to get online user ;
    io.emit("getOnlineUser",Object.keys(userSoketMap));
    soket.on("disconnect",()=>{
        console.log("user disconnected",soket.id);
        delete userSoketMap[userId];
        io.emit("getOnlineUser",Object.keys(userSoketMap));
    
    });
});
export {app,server,io};