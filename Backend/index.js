import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// files
import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
//5XAhDnvqb4oB9CS5


const PORT = process.env.PORT || 3000
app.use("/api/v1/users", router)

app.listen(PORT, ()=> console.log(`Server is Running on Port ${PORT}`))
