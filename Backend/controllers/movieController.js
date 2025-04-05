import Movie from "../models/movies.model.js";

export async function createMovie(req, res) {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    return res.json({
      message: "Movie Created Successfully!",
      error: false,
      success: true,
      savedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find();
    return res.json({
      message: "Movie Retrieved Successfully!",
      error: false,
      success: true,
      movies,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function specificMovie(req, res) {
  try {
    const { id } = req.params;
    const specificMovie = await Movie.findById(id);
    if (!specificMovie) {
      return res.status(404).json({
        message: "Movie Not found",
      });
    }
    return res.json({
      message: "SpecificMovie Retrieved Successfully!",
      error: false,
      success: true,
      specificMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({
        message: "Movie Not Found",
        error: true,
        success: false,
      });
    }
    return res.json({
      message: "Movie Updated Successfully!",
      error: false,
      success: true,
      updatedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Movie already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review Added Successfully", review });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

export async function deleteMovie(req, res) {
  try {
    const { id } = req.params;

    const deleteMovie = await Movie.findByIdAndDelete(id);

    if (!deleteMovie) {
      return res.status(404).json({
        message: "Movie Not Found",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Movie Deleted Successfully!",
      error: false,
      success: true,
      deleteMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteComment(req, res) {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        message: "Movie Not found",
        error: true,
        success: false,
      });
    }

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({
        message: "Comment not found",
        error: true,
        success: false,
      });
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;
    await movie.save();
    return res.json({
      message: "Comment Deleted Successfully!",
      error: false,
      success: true,
      reviewIndex,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getTopMovies(req, res) {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);
    return res.json({
      message: "These are Top Rated Movies",
      error: false,
      success: true,
      Movies: topRatedMovies
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function randomMovies(req, res) {
    try {
        const randomMovies = await Movie.aggregate([{$sample: {size: 10}}])

        return res.json({
            message: "Random Movies",
            error: false,
            success: true,
            RandomMovies: randomMovies
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}