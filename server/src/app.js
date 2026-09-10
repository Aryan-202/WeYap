/**
 * @fileoverview Express application configuration and middleware setup.
 * Configures security headers, HTTP logging, JSON body parsing, and routing.
 * @module src/app
 */

import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import appConf from "../dotenv.js";
import userRouter from "./routes/user.routes.js";

/**
 * Express application instance.
 * @type {import('express').Express}
 */
const app = express();

/**
 * HTTP request logger format determined by the current environment.
 * @type {string}
 */
const morganFormat = appConf.NODE_ENV === "production" ? "combined" : "dev";

// Global middlewares
app.use(helmet());
app.use(morgan(morganFormat));
app.use(express.json());

// API Routes
app.use("/api/v1/users", userRouter);

/**
 * Root health check endpoint.
 * @name get/
 * @function
 * @param {import('express').Request} _req - Express request object (unused).
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
app.get("/", (_req, res) => {
  res.send("server is running...");
});

export default app;
