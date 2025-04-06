import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
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

// ✅ Serve image upload BEFORE parsers
app.use("/api/v1/upload", UploadRouter);

// ✅ Now add parsers AFTER image route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/v1/users", router);
app.use("/api/v1/genre", genreRouter);
app.use("/api/v1/movies", MoviesRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT} 👍`));
