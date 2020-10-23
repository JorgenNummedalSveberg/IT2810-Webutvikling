const express = require("express");
const Movie = require("./models/Movie");
const router = express.Router();

router.get("/movies/:genre/:title", async (req, res,e) => {
    try{
        console.log(req.params.genre.substring(7));
        console.log(req.params.title.substring(7));
        const movie = await Movie.find({'genre': req.params.genre})
            .find({ 'title': { $regex: req.params.title.substring(6), $options: "i" } });
        console.log(movie);
        res.send(movie);
    } catch(e){
        res.status(404).json({message: e})
    }
});

module.exports = router;