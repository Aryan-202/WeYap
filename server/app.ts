import express from 'express'
import authRouter from './routes/auth.routes'

const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)

app.get("/", (_req, res) => {
  res.send("Hello");
});

export default app