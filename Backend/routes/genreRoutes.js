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

genreRouter.route("/").post(authenticate, authorizeAdmin, createGenre);
genreRouter.route("/:id").put(authenticate, authorizeAdmin, updateGenre);
genreRouter.route("/:id").delete(authenticate, authorizeAdmin, removeGenre);
genreRouter.route("/genres").get(listGenres);
genreRouter.route("/:id").get(readGenre);

export default genreRouter;
