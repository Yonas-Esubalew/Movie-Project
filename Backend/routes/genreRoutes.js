import express from "express";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createGenre,
  listGenres,
  readGenre,
  removeGenre,
  updateGenre,
} from "../controllers/genreController.js";

const genreRouter = express.Router();

genreRouter.route("/").post( createGenre);
genreRouter.route("/:id").put(updateGenre);
genreRouter.route("/:id").delete( removeGenre);
genreRouter.route("/genres").get(listGenres);
genreRouter.route("/:id").get(readGenre);

export default genreRouter;
