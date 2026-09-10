/**
 * @fileoverview Application configuration loader using environment variables.
 * @module dotenv
 */

import { config } from "dotenv";

// Load environment variables from .env file
config();

/**
 * Application configuration object containing runtime environment variables.
 * @typedef {Object} AppConfig
 * @property {number|string} PORT - Server port number. Defaults to 5000.
 * @property {string} NODE_ENV - Runtime environment ('development' | 'production'). Defaults to 'development'.
 */

/**
 * Application environment configuration.
 * @type {AppConfig}
 */
const appConf = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default appConf;