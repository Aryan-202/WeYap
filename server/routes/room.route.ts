import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as roomController from "../controllers/room.controller";

const roomRouter = Router();

// Protect all room routes
roomRouter.use(authMiddleware);

roomRouter.post("/", roomController.createRoom);
roomRouter.post("/dm", roomController.createDM);
roomRouter.get("/my-rooms", roomController.getMyRooms);
roomRouter.get("/:id", roomController.getRoomById);
roomRouter.patch("/:id", roomController.updateRoom);
roomRouter.delete("/:id", roomController.deleteRoom);
roomRouter.post("/:id/leave", roomController.leaveRoom);
roomRouter.post("/:id/members", roomController.addMember);
roomRouter.delete("/:id/members/:yapperId", roomController.removeMember);

export default roomRouter;
