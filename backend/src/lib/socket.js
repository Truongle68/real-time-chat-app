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

io.on("connection", (socket) => {
  console.log("User connected with id: ", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected with id: ", socket.id);
  });
});

export { io, server, app };
