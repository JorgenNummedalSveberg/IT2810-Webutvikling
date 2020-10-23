const express = require("express");
const Movie = require("./models/Movie");
const router = express.Router();


// Samlet api kall for filmer, filtrert av sjanger og tittel
router.get("/movies/:genre/:title", async (req, res,e) => {
    try{
        // Fjerner "title:" og "genre:", som trengs i tilfellet det ikke er noen sjanger valgt eller noe skrevet i søkefeltet
        const genre = req.params.genre.substring(7);
        const title = req.params.title.substring(7);
        let movies;

        if (genre !== "" && title !== "") {
            // Hvis sjanger og tittel er søkt på
            movies = await Movie
                .find({'genres': genre})
                .find({ 'title': { $regex: title, $options: "i" } });
        } else if (genre !== "") {
            // Hvis bare sjanger er søkt på
            movies = await Movie
                .find({'genres': genre});
        } else if (title !== "") {
            // Hvis bare tittel er søkt på
            movies = await Movie
                .find({ 'title': { $regex: req.params.title.substring(7), $options: "i" } })
        } else {
            // Hvis ingen kriterer er søkt på
            movies = await Movie.find();
        }
        res.send(movies);

    } catch(e){
        res.status(404).json({message: e})
    }
});

module.exports = router;