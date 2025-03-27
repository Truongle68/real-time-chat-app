import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

export function getReceiverSocketId(userId){
  return userSocketMap[userId]  
}

const userSocketMap = {}

io.on("connection", (socket) => {
  console.log("User connected with id: ", socket.id);

  const userId = socket.handshake.query.userId;
  if(userId)
    userSocketMap[userId] = socket.id

  io.emit("getOnlineUser", Object.keys(userSocketMap))    

  socket.on("disconnect", () => {
    console.log("User disconnected with id: ", socket.id);
    delete userSocketMap[userId]
    io.emit("getOnlineUser", Object.keys(userSocketMap))    
  });
});

export { io, server, app };
