import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {app,server,io} from "../lib/soket.js";

import { connectDB } from "../lib/db.js";
import authRoutes from "../routes/auth.routes.js";
import messageRoutes from "../routes/message.routes.js"

dotenv.config();

// const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message",messageRoutes)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
