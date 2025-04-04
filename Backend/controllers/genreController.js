import genreModel from "../models/genre.model.js";

export async function createGenre(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is Required" });
    }

    const ExistGenre = await genreModel.findOne({ name });

    if (ExistGenre) {
      return res.json({ error: "Already exists" });
    }

    const genre = await new genreModel({ name }).save();

    return res.json({
      message: "Genre Created Successfully!",
      error: false,
      success: true,
      genre,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateGenre(req, res) {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const genre = await genreModel.findOne({ _id: id });
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    genre.name = name;
    const updatedGenre = await genre.save();
    return res.json({
      message: "Genre Updated Successfully!",
      error: false,
      success: true,
      updatedGenre,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function removeGenre(req, res) {
  try {
    const { id } = req.params;
    const removed = await genreModel.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ error: "Genre not found" });
    }
    return res.json({
      message: "Genre Deleted Successfully!",
      error: false,
      success: true,
      removed,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function listGenres(req, res) {
  try {
    const all = await genreModel.find({});

    return res.json({
      message: "Genre Retrieved  Successfully!",
      error: false,
      success: true,
      all,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function readGenre(req, res) {
  try {
    const genre = await genreModel.findOne({
      _id: req.params.id,
    });
    return res.json({
      message: "Single Genre Retrieved Successfully!",
      error: false,
      success: true,
      genre,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
