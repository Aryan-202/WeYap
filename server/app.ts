import express from 'express'
import authRouter from './routes/auth.routes'
import roomRouter from './routes/room.route'
import yapRouter from './routes/yap.route'
import yapperRouter from './routes/yapper.route'

const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/yaps', yapRouter)
app.use('/api/yappers', yapperRouter)

app.get("/", (_req, res) => {
  res.send("Hello");
});

export default app