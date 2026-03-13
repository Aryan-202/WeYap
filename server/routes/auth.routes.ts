import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.get('/login', login)
authRouter.get('/register', register)

export default authRouter