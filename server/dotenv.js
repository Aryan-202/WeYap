import { config } from "dotenv";

config()

const appConf = {
    PORT: process.env.PORT || 5000,
}

export default appConf