import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Movie from "./models/Movie";
import User from "./models/User";
import bodyParser from "body-parser";

mongoose
    .connect("mongodb://admin:admin@it2810-55.idi.ntnu.no:27017/it2810?authSource=admin", {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        const app = express();
        const jsonParser = bodyParser.json()
        const urlencodedParser = bodyParser.urlencoded({ extended: false })
        app.use(
            cors({
                origin: 'http://localhost:3000',
                credentials: true,
            })
        );

        // Gets movies, filters depending on queries
        app.get("/api/movies", async (req, res,e) => {
            try{
                console.log(req.query);
                const genre = req.query.genre as string;
                const title = req.query.title as string;
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
                const movie = await Movie.findOne({ '_id': req.params.id }).exec();
                movie.watches++;
                await movie.save();
                res.send("1 view to "+movie.title);
            } catch {
                res.status(404);
                res.send({ error: "Movie doesn't exist!" });
            }
        });
        app.get("/api/user/add/:userName/:password/:movies", async (req, res) => {
            const userName = req.body.name;
            const password = req.body.password;
            const movies = req.body.movies ? JSON.parse(req.params.movies) : [];
            const user = new User({'userName': userName, 'password': password, 'movies': movies} );
            try {
                await user.save().then(user => res.status(200).send({message: user}));
            } catch(e) {
                res.status(404).send({message: "User could not be saved"})
            }
        });
        app.post("/api/user/add", jsonParser, async (req, res) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            const userName = req.body.userName;
            const password = req.body.password;
            const movies = req.body.movies;
            const user = new User({'userName': userName, 'password': password, 'movies': movies} );
            console.log(req.body);
            console.log(req.query);
            console.log(userName, password, movies);
            try {
                await user.save().then(user => res.status(200).send({message: user}));
            } catch(e) {
                res.status(404).send({message: "User could not be saved"})
            }
        });
        app.use(express.json());
        app.listen(5000, () => {
            console.log("Server has started!");
        });
    });