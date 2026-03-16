import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as yapController from "../controllers/yap.controller";

const yapRouter = Router();

yapRouter.use(authMiddleware);

yapRouter.post("/", yapController.sendYap);
yapRouter.get("/room/:roomId", yapController.getRoomYaps);
yapRouter.patch("/:id", yapController.updateYap);
yapRouter.delete("/:id", yapController.deleteYap);
yapRouter.post("/:id/react", yapController.reactYap);
yapRouter.delete("/:id/react", yapController.unreactYap);

export default yapRouter;
