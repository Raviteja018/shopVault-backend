import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("🗄️ Server is running on PORT: ", PORT);
    });
  })
  .catch((err) => {
    console.error("Database Connection failed: ", err.message);
  });
