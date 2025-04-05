import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"
// files
import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js";
import genreRouter from "./routes/genreRoutes.js";
import MoviesRouter from "./routes/MoviesRouter.js";
import UploadRouter from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_END_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
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
app.use("/api/v1/movies", MoviesRouter)
app.use("/api/v1/upload", UploadRouter)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}👍`));
