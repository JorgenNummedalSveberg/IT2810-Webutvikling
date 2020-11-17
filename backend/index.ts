import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Movie, {IMovie} from "./models/Movie";
import User from "./models/User";
import bodyParser from "body-parser";

mongoose
    .connect("mongodb://admin:admin@it2810-55.idi.ntnu.no:27017/it2810?authSource=admin", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        const app = express();
        const jsonParser = bodyParser.json()
        app.use(
            cors({
                origin: 'http://localhost:3000',
                credentials: true,
            })
        );

        // Henter filmer etter gidde IDer
        app.post("/api/movies", jsonParser, async (req, res, e) => {
            try {
                const stringIDs = req.body.ids as string[];
                const IDs = stringIDs.map(id => mongoose.Types.ObjectId(id));
                const movieList = await Movie.find({'_id': {$in: IDs}})
                res.status(200).send(movieList);
            } catch {
                res.status(404).send({error: "Couldn't fetch movies"})
            }
        });

        // Henter filmer, filtrert basert på queries, og gir tilbake en sortert index
        app.post("/api/movies/index", jsonParser, async (req, res) => {
            const sortAtt = ['title', 'year', 'imdbRating', 'duration'];
            const sortBy = ["Name", "Year", "Rating", "Length"];
            try {
                const genre = req.body.genre as string;
                const title = req.body.title as string;
                const sort = req.body.sort as string;
                const desc = req.body.desc as boolean;
                const yearRange = req.body.yearRange as number[];
                const scoreRange = req.body.scoreRange as number[];
                const userName = req.body.user as string;
                const page = req.body.page as number;
                let movies = await Movie.find({'title': {$regex: title, $options: "i"}})
                    .sort((desc ? '-' : '') + sortAtt[sortBy.indexOf(sort)])
                if (sort === "Name") {
                    movies.reverse();
                }
                let genreList: string[] = [];
                movies.forEach(movie => {
                    movie.genres.forEach((genre: string) => {
                        if (!genreList.includes(genre)) {
                            genreList.push(genre);
                        }
                    })
                })
                movies = movies
                    .filter(movie =>
                        (movie.genres.includes(genre) || genre === "") &&
                        movie.imdbRating >= scoreRange[0] &&
                        movie.imdbRating <= scoreRange[1] &&
                        parseInt(movie.year) >= yearRange[0] &&
                        parseInt(movie.year) <= yearRange[1])
                if (userName !== "") {
                    const user = await User.findOne({'userName': userName})
                    movies = movies.filter(movie => user.movies.includes(movie._id))
                }
                let movieList: [IMovie[]];
                movies.forEach((movie, index) => {
                    if (index === 0) {
                        movieList = [[]];
                    }
                    if (index % 24 === 0) movieList[Math.floor(index / 24)] = [];
                    movieList[Math.floor(index / 24)].push(movie);
                })
                const movieIndex = movieList[page].map(movie => movie._id);
                res.status(200).send({movies: movieIndex, pages: movieList.length})
            } catch {
                res.status(404).send({error: "Couldn't fetch movies"})
            }
        });

        // Henter filmene fra watchlist til en bruker
        app.get("/api/user", async (req, res, e) => {
            try {
                const userName = req.query.userName as string;
                const password = req.query.password as string;
                const user = await User.findOne({'userName': userName, 'password': password}).exec();
                console.log(user.movies)
                res.status(200).send(user.movies);
            } catch {
                res.status(404).json({error: "Couldn't fetch movies"})
            }
        });

        // Legger til en bruker
        app.post("/api/user/add", jsonParser, async (req, res) => {
            const userName = req.body.userName;
            const password = req.body.password;
            const movies = req.body.movies;
            const user = new User({'userName': userName, 'password': password, 'movies': movies});
            try {
                await user.save();
                res.status(200).send({message: "User added"})
            } catch {
                res.status(404).send({error: "Could not add user"})
            }
        });

        // Legger til en film i brukerens watchlist
        app.post("/api/user/addMovie", jsonParser, async (req, res) => {
            const userName = req.body.userName;
            const movieId = req.body.movieId;
            try {
                const user = await User.findOne({'userName': userName}).exec();
                const movie = await Movie.findOne({'_id': movieId}).exec();
                movie.watches++;
                user.movies.push(movieId);
                await user.save();
                await movie.save();
                res.status(200).send({message: "Movie added to watchlist"});
            } catch {
                res.status(404).send({error: "Could not add to watchlist"});
            }
        });
        app.post("/api/user/removeMovie", jsonParser, async (req, res) => {
            const movieId = req.body.movieId;
            const userName = req.body.userName;
            try {
                const user = await User.findOne({'userName': userName}).exec();
                const movie = await Movie.findOne({'_id': movieId}).exec();
                movie.watches--;
                if (user.movies.includes(movieId)) {
                    user.movies = user.movies.filter(movie => movie !== movieId);
                    await movie.save();
                    await user.save();
                    res.status(200).send("Movie removed from watchlist");
                } else {
                    res.status(404).send({error: "Movie not in watchlist"});
                }
            } catch {
                res.status(404).send({error: "Could not remove from watchlist"});
            }

        })
        app.use(express.json());
        app.listen(5000, () => {
            console.log("Server has started!");
        });
    });