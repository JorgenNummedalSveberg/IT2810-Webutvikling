const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: String,
    title: String,
    year: String,
    genres: [String],
    ratings: Array,
    poster: String,
    contentRating: String,
    duration: String,
    releaseDate: String,
    averageRating: Number,
    originalTitle: String,
    storyline: String,
    actors: Array,
    imdbRating: Number,
    posterurl: String,
});

module.exports = mongoose.model("Movie", schema);