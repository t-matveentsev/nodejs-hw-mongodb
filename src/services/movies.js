import MovieCollection from "../db/models/Movies.js";

export const getMovies = () => MovieCollection.find();

export const getMovieById = (id) =>
  MovieCollection.findOneAndDelete({ _id: id });
