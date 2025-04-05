import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkid.js";
import {
  createMovie,
  deleteComment,
  deleteMovie,
  getAllMovies,
  getTopMovies,
  movieReview,
  randomMovies,
  specificMovie,
  updateMovie,
} from "../controllers/movieController.js";
const MoviesRouter = express.Router();


MoviesRouter.post("/create-movie", createMovie);
MoviesRouter.get("/all-movies", getAllMovies);
MoviesRouter.get("/top-rated-movies", getTopMovies); // ✅ move this up
MoviesRouter.get("/random-movies", randomMovies)
MoviesRouter.put("/update-movie/:id", updateMovie);
MoviesRouter.post("/:id/reviews", authenticate, authorizeAdmin, movieReview);
MoviesRouter.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
MoviesRouter.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);
MoviesRouter.get("/:id", specificMovie); // ✅ this should be last


export default MoviesRouter;
