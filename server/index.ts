import app from "./app";
import appconfig from "./dotenv";

const port = appconfig.PORT

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
