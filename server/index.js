/**
 * @fileoverview Entry point for the Express server.
 * Initializes the HTTP server and listens for incoming requests.
 * @module index
 */

import appConf from "./dotenv.js";
import app from "./src/app.js";

/**
 * Server listening port.
 * @type {number|string}
 */
const PORT = appConf.PORT;

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

/**
 * Starts the HTTP server.
 */
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
