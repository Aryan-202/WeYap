import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import appConf from "../dotenv.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const morganFormat = appConf.NODE_ENV === "production" ? "combined" : "dev";

app.use(helmet());
app.use(morgan(morganFormat));
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.get("/", (_req, res) => {
  res.send("server is running...");
});

export default app;
