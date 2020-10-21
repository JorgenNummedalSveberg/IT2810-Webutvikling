const express = require("express");
const Movie = require("./models/Movie");
const router = express.Router();

router.get("/movies", async (req, res,e) => {
    try{
        const movie = await Movie.find();
        /* res.status(404).json({message: "funker"}) */
        res.send(movie);  
       
    } catch(e){
        res.status(404).json({message: e})
    }
});

router.get("/searchByGenre/:genre", async (req, res,e) => {
    try{
        const movie = await Movie.find({'genres': req.params.genre});
        /* res.status(404).json({message: "funker"}) */
        res.send(movie);

    } catch(e){
        res.status(404).json({message: e})
    }
});

router.post("/movie", async (req, res) => {
    const movie = new Movie({
        id: req.body.id,
        title: req.body.title,
        year: req.body.year,
        genres: req.body.genres,
        ratings: req.body.ratings,
        poster: req.body.poster,
        contentRating: req.body.contentRating,
        duration: req.body.duration,
        releaseDate: req.body.releaseDate,
        averageRating: req.body.averageRating,
        originalTitle: req.body.originalTitle,
        storyline: req.body.storyline,
        actors: req.body.actors,
        imdbRating: req.body.imdbRating,
        posterurl: req.body.posterurl,
    });
    await movie.save();
    res.send(movie);
});

router.get("/movie/:title", async (req, res) => {
    try {
        const movie = await Movie.find({ 'title': { $regex: req.params.title, $options: "i" } });
        res.send(movie);
    } catch {
        res.status(404);
        res.send({ error: "Movie doesn't exist!" });
    }
});

router.patch("/movie/:id", async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id });

        if (req.body.title) {
            movie.title = req.body.title;
        }

        if (req.body.content) {
            movie.content = req.body.content;
        }

        await movie.save();
        res.send(movie);
    } catch {
        res.status(404);
        res.send({ error: "Movie doesn't exist!" });
    }
});

router.delete("/movie/:id", async (req, res) => {
    try {
        await Movie.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Movie doesn't exist!" });
    }
});

module.exports = router;