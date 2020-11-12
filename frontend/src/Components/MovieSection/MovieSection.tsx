import React from 'react';
import {Grid, Card, CardContent, Typography, useMediaQuery} from '@material-ui/core'
import {Pagination} from '@material-ui/lab'
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {setPage} from "../../actions";
import Popup from './Popup';
import MovieCard, {DimCard} from "./MovieCard";
import {makeStyles} from "@material-ui/styles";


// Komponent som viser frem alle filmene i en responsiv grid
function MovieSection() {
    // Nødvendig for redux
    const dispatch = useDispatch();

    // Redux tate for å holde styr på hvilen side vi er på
    const page = useSelector((state: State) => state.page);

    // Definerer en side å vise i tilfellet ingen filmer blir hentet
    const errorPage = (
        <Grid>
            <Card>
                <CardContent>
                    <Typography color='secondary' variant="h5" component="h2">
                        No movies
                    </Typography>
                </CardContent>
                <CardContent>
                    This might be because:
                </CardContent>
                <ul>
                    <li><Typography color='secondary'>You may not be on the NTNU network or your VPN is off</Typography></li>
                    <li><Typography color='secondary'>We do not have the movie you're looking for</Typography></li>
                </ul>
                <CardContent>
                    <a href={'https://www.youtube.com/watch?v=oHg5SJYRHA0'}>Maybe this can help</a>
                </CardContent>
            </Card>
        </Grid>
    )

    const classes = makeStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            overflowY: 'auto',
        },
        movieGrid: {
            width: '100%',
            margin: '20px',
        }
    })

    // Sjekker først om det faktisk ble hentet filmer, og så filterer og displayer filmene
    return useSelector((state: State) => {
        if (state.movies.hasOwnProperty('error')) {
            return (errorPage);
        } else {
            // Filtrerer utvalget basert på rating og årstall
            const movies = state.movies
                .filter(movie =>
                    movie.imdbRating >= state.filter.score[0] &&
                    movie.imdbRating <= state.filter.score[1] &&
                    parseInt(movie.year) >= state.filter.year[0] &&
                    parseInt(movie.year) <= state.filter.year[1] &&
                    (!state.user || (!!state.user && (!state.filter.myMovies || state.user.movies.includes(movie._id)))));

            if (state.movies.length > 0 && movies.length === 0) {
                return (errorPage);
            }

            const movieList: any[] = [];
            movies.forEach((movie, index) => {
                if (!movieList[Math.floor(index / 24)]) {
                    movieList[Math.floor(index / 24)] = [];
                }
                movieList[Math.floor(index / 24)].push(movie);
            })

            // Lager en liste med sorte kort som placeholder mens filmene laster
            const dimList = () => {
                const list = [];
                for (let i = 0; i < 24; i++) {
                    list.push(<DimCard key={i}/>);
                }
                return list;
            }

            // Lager en liste av alle MovieCards som skal med i Griden
            let movieCards: any[] = dimList();
            if (typeof movieList[page] !== "undefined") {
                movieCards = movieList[page].map((movie: any, index: number) => {
                    return (
                        <MovieCard movie={movie} key={index}/>
                    )
                })
            }

            // Definerer sidevalg menyen
            const pagination = (
                <div>
                    <Pagination
                        size="large"
                        onChange={(e: object, page: number) => {
                            dispatch(setPage(page - 1));
                        }}
                        page={page + 1}
                        count={movieList.length}/>
                </div>
            )


            return (
                <div className={classes().root}>
                    {state.details.show ?
                        <Popup/> : null
                    }
                    {pagination}
                    <Grid
                        className={classes().movieGrid}
                        container
                        justify="center"
                        alignItems="stretch"
                        spacing={4}
                        >
                        {movieCards}
                    </Grid>
                    {pagination}
                </div>
            )
        }
    })
}

export default MovieSection;