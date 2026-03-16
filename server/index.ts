import { createServer } from "http";
import app from "./app";
import appconfig from "./dotenv";
import { initSocket } from "./config/socket";

const port = appconfig.PORT;
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port} 🚀`);
});
