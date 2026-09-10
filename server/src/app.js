import helmet from "helmet";
import express from 'express'
import morgan from "morgan";
import appConf from "../dotenv.js";

const app = express()
const morganFormat = appConf.NODE_ENV === 'production' ? 'combined' : 'dev'

app.use(helmet())
app.use(morgan(morganFormat))

app.get('/', (_req, res) => {
    res.send("server is running...")
})

export default app