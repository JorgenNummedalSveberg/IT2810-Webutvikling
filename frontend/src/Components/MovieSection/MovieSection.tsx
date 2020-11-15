import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Divider,
    Drawer,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core'
import {Pagination} from '@material-ui/lab'
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {setPage, showPopup} from "../../actions";
import Popup from './Popup';
import MovieCard, {DimCard} from "./MovieCard";
import {makeStyles} from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import ImdbIcon from "../Shared/ImdbIcon";

// Komponent som viser frem alle filmene i en responsiv grid
function MovieSection(props: { refresh: (number: number) => void, error: boolean }) {

    const theme = useTheme();
    const cardClasses = makeStyles({
        card: {
            height: "100%",
            width: '100%'},
        gridItem: {flexGrow: 1,
            flexBasis: 1,
            maxWidth: '600px',
            width: '600px'},
        paperButton: {
            height: "100%",
            width: '100%'},
        paper: {
            backgroundColor: theme.palette.primary.light,
            height: "100%",
            width: '100%',
            display: 'flex',
            flexDirection: 'row'},
        poster: {
            maxWidth: '500px',
            minWidth: '250px'},
        details: {
            padding: '10px',
            display: 'flex',
            flexDirection: 'column'},
        title: {flexGrow: 1},
        description: {
            flexGrow: 4,
            color: theme.palette.getContrastText(theme.palette.primary.light),
            textAlign: 'left'},
        bottomInfo: {
            margin: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            '& *': {margin: '5px'}
        },
        duration: {color: theme.palette.getContrastText(theme.palette.primary.light), display: 'flex', alignItems: 'center'},
        noMargin: {
            margin: 0
        }
    })

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Redux tate for å holde styr på hvilen side vi er på
    const page = useSelector((state: State) => state.page);

    // Redux tate for å holde styr på om popup er åpen
    const show = useSelector((state: State) => state.details.show);

    // Definerer en side å vise i tilfellet ingen filmer blir hentet
    const errorPage = (
            <Paper className={`${cardClasses().details} ${cardClasses().gridItem}`} elevation={5}>
                <div className={cardClasses().title}>
                    <Typography color='error' variant="h5" component="h2">
                        No movies
                    </Typography>
                    <Divider/>
                </div>
                <div className={cardClasses().description}>
                    This might be because:
                </div>
                <div className={cardClasses().bottomInfo}>
                    <ul>
                        <li><Typography color='error'>You may not be on the NTNU network or your VPN is off</Typography>
                        </li>
                        <li><Typography color='error'>We do not have the movie you're looking for</Typography></li>
                    </ul>
                </div>
                <a href={'https://www.youtube.com/watch?v=oHg5SJYRHA0'}>Maybe this can help</a>
            </Paper>
    )

    let movies = useSelector((state: State) => state.movies);

    const classes = makeStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            overflowY: 'auto',
        },
        pagination: {
            color: theme.palette.getContrastText('#445585')
        },
        movieGrid: {
            width: '100%',
            margin: '20px',
        },
        popup: {
            backgroundColor: theme.palette.primary.light,
            textAlign: 'center',
            width: useMediaQuery('(max-width: 1400px)').valueOf() ? '100%' : '30vw',
            height: '100%',
            paddingTop: '5%',
            paddingBottom: '5%'
        },
        errorPage: {
            display: props.error ? 'flex' : 'none',
            justifyContent: 'center',
            padding: '50px'
        },
        moviePage: {
            display: props.error ? 'none' : 'initial'
        }
    })

    // Lager en liste med sorte kort som placeholder mens filmene laster
    const dimList = () => {
        const list = [];
        for (let i = 0; i < 24; i++) {
            list.push(<DimCard classes={cardClasses} key={i}/>);
        }
        return list;
    }

    // Lager en liste av alle MovieCards som skal med i Griden
    let movieCards: any[] = dimList();
    if (movies.movies.length > 0) {
        movieCards = movies.movies.map((movie: any, index: number) => {
            return (
                <MovieCard classes={cardClasses} movie={movie} key={index}/>
            )
        })
    }

    // Definerer sidevalg menyen
    const pagination = (
        <div >
            <Pagination
                color={'primary'}
                size="large"
                onChange={(e: object, page: number) => {
                    dispatch(setPage(page - 1));
                    props.refresh(page - 1);
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