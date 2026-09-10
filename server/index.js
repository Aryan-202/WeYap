import appConf from "./dotenv.js";
import app from "./src/app.js";

const PORT = appConf.PORT;

app.get("/", (_req, res) => {
  res.send("server is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
