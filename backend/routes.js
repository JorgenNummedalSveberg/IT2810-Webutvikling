const express = require("express");
const Movie = require("./models/Movie");
const router = express.Router();

router.get("/movies/:genre/:title", async (req, res,e) => {
    let movies;
    try{
        console.log(req.params.genre.substring(7));
        console.log(req.params.title.substring(7));
        const movie = Movie
            .find({'genres': req.params.genre.substring(7)})
            .find({ 'title': { $regex: req.params.title.substring(7), $options: "i" } })
        console.log(movie);
        res.send(movie);
        movies = movie;
    } catch(e){
        res.status(404).json(e);
    }
});

module.exports = router;