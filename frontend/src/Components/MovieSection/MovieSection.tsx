import React, {useCallback, useState} from 'react';
import {Button, Card, CardContent, Drawer, Grid, Typography, useMediaQuery} from '@material-ui/core'
import {Pagination} from '@material-ui/lab'
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {setPage, showPopup} from "../../actions";
import Popup from './Popup';
import MovieCard, {DimCard} from "./MovieCard";
import {makeStyles} from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Console} from "inspector";

// Komponent som viser frem alle filmene i en responsiv grid
function MovieSection(props: {refresh: (number: number) => void, error: boolean}) {
    // Nødvendig for redux
    const dispatch = useDispatch();

    // Redux tate for å holde styr på hvilen side vi er på
    const page = useSelector((state: State) => state.page);

    // Redux tate for å holde styr på om popup er åpen
    const show = useSelector((state: State) => state.details.show);

    const [error, setError] = useState(false);

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
                    <li><Typography color='secondary'>You may not be on the NTNU network or your VPN is off</Typography>
                    </li>
                    <li><Typography color='secondary'>We do not have the movie you're looking for</Typography></li>
                </ul>
                <CardContent>
                    <a href={'https://www.youtube.com/watch?v=oHg5SJYRHA0'}>Maybe this can help</a>
                </CardContent>
            </Card>
        </Grid>
    )

    // Sjekker først om det faktisk ble hentet filmer, og så filterer og displayer filmene
    const movieState = useSelector((state: State) => state.movies.movies);
    let movies = useSelector((state: State) => state.movies);

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
        },
        popup: {
            backgroundColor: '#E85A4F',
            textAlign: 'center',
            width: useMediaQuery('(max-width: 1400px)').valueOf() ? '100%' : '30vw',
            height: '100%',
            paddingTop: '5%',
            paddingBottom: '5%'
        },
        errorPage: {
            display: props.error ?'initial':'none'
        },
        moviePage: {
            display: props.error ?'none':'initial'
        }
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
    if (movies.movies.length > 0) {
        movieCards = movies.movies.map((movie: any, index: number) => {
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
                    props.refresh( page - 1);
                }}
                page={page + 1}
                count={movies.pages}/>
        </div>
    )

    return (
        <div>
            <div className={classes().errorPage}>
                {errorPage}
            </div>
            <div className={classes().moviePage}>
                <Drawer anchor={'right'} open={show} onClose={() => dispatch(showPopup(false))}>
                    <Button startIcon={<ArrowBackIcon/>} onClick={() => dispatch(showPopup(false))}>Close</Button>
                    <div className={classes().popup}>
                        <Popup/>
                    </div>
                </Drawer>
                <div className={classes().root}>
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
            </div>
        </div>
    )
}

export default MovieSection;