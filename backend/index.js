import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { UserRouter } from "./routes/UserAuth.js";
import { HouseRouter } from "./routes/HouseRoute.js";


dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);


app.use(cookieParser());
// Routes
app.use("/auth", UserRouter); 
app.use("/", HouseRouter);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
