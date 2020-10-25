const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: String,
    title: String,
    year: String,
    genres: [String],
    ratings: [Number],
    poster: String,
    contentRating: String,
    duration: Number,
    releaseDate: String,
    averageRating: Number,
    originalTitle: String,
    storyline: String,
    actors: [String],
    imdbRating: Number,
    posterurl: String,
    watches: Number
});

module.exports = mongoose.model("Movie", schema);