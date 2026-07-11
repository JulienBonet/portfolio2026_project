import dotenv from "dotenv";
import app from "./app.js";
import { testDatabaseConnection } from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await testDatabaseConnection();

    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}

startServer();