import React from 'react';
import {useMediaQuery, useTheme} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {setPopup, showPopup} from "../../actions";
import MovieCard from "./MovieCard";
import DimCard from "./DimCard";
import {makeStyles} from "@material-ui/styles";
import {Movie} from "../../types/Movie";
import MovieSection from "./MovieSection";
import {parseTime} from "../../movieService";

// Komponent som viser frem alle filmene i en responsiv grid
function MovieSectionContainer(props: { refresh: (number: number) => void, error: boolean }) {

    // Henter inn redux state
    const state = useSelector((state: State) => state);

    const theme = useTheme();
    const classes = makeStyles({
        root: {marginLeft: useMediaQuery('(max-width: 1400px)').valueOf() ? '' : '500px'},
        main: {display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', overflowY: 'auto',},
        pagination: {color: theme.palette.getContrastText('#445585')},
        movieGrid: {width: '100%', margin: '20px',},
        popup: {
            backgroundColor: theme.palette.primary.light,
            textAlign: 'center',
            width: useMediaQuery('(max-width: 1400px)').valueOf() ? '100%' : '30vw',
            height: '100%',
            paddingTop: '5%',
            paddingBottom: '5%'
        },
        errorPage: {display: props.error ? 'flex' : 'none', justifyContent: 'center', padding: '50px'},
        moviePage: {display: props.error ? 'none' : 'initial'},
        card: {height: "100%", width: '100%'},
        gridItem: {flexGrow: 1, flexBasis: 1, maxWidth: '600px', width: '600px'},
        paperButton: {height: "100%", width: '100%'},
        paper: {
            backgroundColor: theme.palette.primary.light,
            height: "100%",
            width: '100%',
            display: 'flex',
            flexDirection: 'row'
        },
        poster: {maxWidth: '500px', minWidth: '250px'},
        details: {padding: '10px', display: 'flex', flexDirection: 'column'},
        title: {flexGrow: 1},
        description: {
            flexGrow: 4,
            color: theme.palette.getContrastText(theme.palette.primary.light),
            textAlign: 'left'
        },
        bottomInfo: {
            margin: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            '& *': {margin: '5px'}
        },
        duration: {
            color: theme.palette.getContrastText(theme.palette.primary.light),
            display: 'flex',
            alignItems: 'center'
        },
        noMargin: {margin: 0}
    })

    // Lager en liste med sorte kort som placeholder mens filmene laster
    const dimList = () => {
        const list = [];
        for (let i = 0; i < 24; i++) {
            list.push(<DimCard classes={classes} key={i}/>);
        }
        return list;
    }


    // Nødvendig for redux
    const dispatch = useDispatch();

    // Åpner opp Popup.
    function handleClick(movie: Movie) {
        dispatch(setPopup(movie));
        dispatch(showPopup(true));
    }

    // Lager en liste av alle MovieCards som skal med i Griden
    let movieCards: any[] = [];
    const movieList = state.movieCache.filter(movie => state.indexList.includes(movie._id))
        .sort((a, b) => state.indexList.indexOf(a._id) - state.indexList.indexOf(b._id))
    if (state.indexList.length > 0) {
        movieCards = movieList.map((movie: Movie, index: number) => {
            return (
                <MovieCard handleClick={handleClick} classes={classes} movie={movie} key={index}
                           duration={parseTime(movie.duration)}/>
            )
        })
    }

    return (
        <MovieSection
            myMovies={state.filter.myMovies}
            page={state.page}
            pages={state.pages}
            classes={classes}
            dispatch={useDispatch()}
            movieCards={movieCards.length === state.indexList.length && movieCards.length > 0 ? movieCards : dimList()}
            popupShow={state.details.show}
            refresh={props.refresh}/>
    )
}

export default MovieSectionContainer;