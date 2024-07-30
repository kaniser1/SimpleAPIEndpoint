import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { usersRouter } from "./routes/usersRouter";

// Setup
dotenv.config();
export const app: Application = express();
const port: number = +(process.env.PORT_NUMBER || 3000);

app.use(express.json());

// Connections
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.log("Could not connect to MongoDB: ", error));

// Route/Routers
app.use("/users", usersRouter);

// Start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
