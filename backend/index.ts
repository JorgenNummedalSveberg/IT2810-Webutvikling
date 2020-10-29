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

        // Gets movies viewed by the user
        app.get("/api/user", async (req, res,e) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            try{
                const userName = req.query.userName as string;
                const user = await User.findOne({ 'userName': userName }).exec();
                res.send(user.movies);
            } catch(e){
                res.status(404).json({message: "Couldn't fetch movies"})
            }
        });

        // Legger til en view på filmen
        app.post("/api/user/addMovie", jsonParser, async (req, res) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            const userName = req.body.userName;
            const movieId = req.body.movieId;
            try {
                const user = await User.findOne({ 'userName': userName }).exec();
                const movie = await Movie.findOne({ '_id': movieId }).exec();
                movie.watches++;
                user.movies.push(movieId);
                await user.save();
                await movie.save();
                res.send("1 view to "+movie.title+" and added "+movie.title+" to "+userName+"'s movielist");
            } catch(e) {
                res.status(404);
                res.send({ error: "Couldn't add movie" });
                console.log(e);

            }
        });
        app.post("/api/user/add", jsonParser, async (req, res) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            const userName = req.body.userName;
            const password = req.body.password;
            const movies = req.body.movies;
            const user = new User({'userName': userName, 'password': password, 'movies': movies} );
            console.log(user);
            try {
                await user.save().then(user => res.status(200).send(user));
            } catch(e) {
                res.status(404).send()
            }
        });
        app.post("/api/user/removeMovie", jsonParser, async (req, res) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            const movieId = req.body.movieId;
            const userName = req.body.userName;
            try {
                const user = await User.findOne({ 'userName': userName }).exec();
                const movie = await Movie.findOne({ '_id': movieId }).exec();
                movie.watches--;
                if (user.movies.includes(movieId)) {
                    console.log("yes, it includes")
                    user.movies = user.movies.filter(movie => movie !== movieId);
                    await movie.save();
                    await user.save();
                    res.status(200).send("Movie removed");
                } else {
                    res.status(404).send("Movie not in list");
                }
            } catch (e) {
                res.status(404).send();
                console.log(e);
            }

        })
        app.use(express.json());
        app.listen(5000, () => {
            console.log("Server has started!");
        });
    });