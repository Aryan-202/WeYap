import { config } from "dotenv";

config()

const appConf = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
}

export default appConf