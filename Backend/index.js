import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"
// files
import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js";
import genreRouter from "./routes/genreRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Allow requests from your frontend
app.use(
  cors({
    origin: process.env.FRONT_END_URI, // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you're using cookies/auth
  })
);
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//5XAhDnvqb4oB9CS5

const PORT = process.env.PORT || 3000;
app.use("/api/v1/users", router);
app.use("/api/v1/genre",genreRouter)

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
