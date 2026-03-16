import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as yapperController from "../controllers/yapper.controller";

const yapperRouter = Router();

yapperRouter.use(authMiddleware);

yapperRouter.get("/me", yapperController.getMe);
yapperRouter.patch("/profile", yapperController.updateProfile);
yapperRouter.get("/search", yapperController.searchYappers);
yapperRouter.get("/:tag", yapperController.getYapperByTag);

export default yapperRouter;
