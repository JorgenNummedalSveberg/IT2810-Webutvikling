import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Movie from "./models/Movie";

mongoose
    .connect("mongodb://admin:admin@it2810-55.idi.ntnu.no:27017/it2810?authSource=admin", {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        const app = express();
        app.get("/api/movies/:genre/:title", async (req, res,e) => {
            try{
                // Fjerner "title:" og "genre:", som trengs i tilfellet det ikke er noen sjanger valgt eller noe skrevet i søkefeltet
                const genre = req.params.genre.substring(7);
                const title = req.params.title.substring(6);
                res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
                if (genre !== "" && title !== "") {
                    // Hvis sjanger og tittel er søkt på
                    Movie.find({'genres': genre}).find({ 'title': { $regex: title, $options: "i" }})
                        .then(movies => res.send(movies));
                } else if (genre !== "") {
                    // Hvis bare sjanger er søkt på
                    Movie.find({'genres': genre})
                        .then(movies => res.send(movies));
                } else if (title !== "") {
                    // Hvis bare tittel er søkt på
                    Movie.find({ 'title': { $regex: title, $options: "i" }})
                        .then(movies => res.send(movies));
                } else {
                    // Hvis ingen kriterer er søkt på
                    Movie.find().then(movies => res.send(movies));
                }
            } catch(e){
                res.status(404).json({message: "Couldn't fetch movies"})
            }
        });

        // Legger til en view på filmen
        app.get("/api/movie/addView/:id", async (req, res) => {
            try {
                res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
                const movie = await Movie.findOne({ '_id': req.params.id }).exec();
                movie.watches++;
                await movie.save();
                res.send("1 view to "+movie.title);
            } catch {
                res.status(404);
                res.send({ error: "Movie doesn't exist!" });
            }
        });
        app.use(cors);
        app.use(express.json());
        app.listen(5000, () => {
            console.log("Server has started!");
        });
    });