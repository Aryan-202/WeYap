import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import jwt from "jsonwebtoken";
import appconfig from "../dotenv";
import prisma from "./prisma";

let io: Server;

export const initSocket = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Adjust this for production
      methods: ["GET", "POST"],
    },
  });

  // Auth Middleware for Sockets
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(" ")[1];
      
      if (!token) {
        return next(new Error("Token toh de bhai"));
      }

      const decoded: any = jwt.verify(token, appconfig.JWT_SECRET as string);
      const yapper = await prisma.yapper.findUnique({
        where: { id: decoded.id },
      });

      if (!yapper) {
        return next(new Error("Yapper nahi mila"));
      }

      socket.data.user = yapper;
      next();
    } catch (error) {
      next(new Error("Auth fail ho gaya"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.data.user;
    console.log(`User connected: ${user.yapTag} (${socket.id})`);

    // Join room event
    socket.on("join_room", (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${user.yapTag} joined room: ${roomId}`);
    });

    // Leave room event
    socket.on("leave_room", (roomId: string) => {
      socket.leave(roomId);
      console.log(`User ${user.yapTag} left room: ${roomId}`);
    });

    // Typing indicators
    socket.on("typing", (roomId: string) => {
      socket.to(roomId).emit("user_typing", { 
        userId: user.id, 
        yapTag: user.yapTag,
        displayName: user.displayName 
      });
    });

    socket.on("stop_typing", (roomId: string) => {
      socket.to(roomId).emit("user_stopped_typing", { userId: user.id });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${user.yapTag}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io initialized nahi hai!");
  }
  return io;
};

export const emitToRoom = (roomId: string, event: string, data: any) => {
  if (io) {
    io.to(roomId).emit(event, data);
  }
};
