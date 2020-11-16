import React, {useCallback, useState} from 'react';
import Header from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {addMovies, setGenresState, setIndexList, setPages} from "./actions";
import {State} from "./types/State";
import {Movie} from "./types/Movie";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import MovieSection from "./Components/MovieSection/MovieSection";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {fetchMovies} from "./movieService";
import FilterSortContainer from "./Components/Main/FilterSortContainer";

// Ulike ting vi sorterer etter, komponenten returnerer en knapp for hvert element
export const sortBy = ["Name", "Rating", "Length", "Year"];


// App komponenten setter default state, og har ansvar for å hente inn filmer og behandle dem
function App() {

    // Holder styr på om det skal vises error, og om det er første gang vi henter filmer eller ikke
    const [error, setError] = useState(false);
    const [first, setFirst] = useState(true);

    // Samler en del dispatches i et objekt som sendes til fetchMovies
    const dispatch = useDispatch();
    function setGenres(genres: string[]) {dispatch(setGenresState(genres))}
    function setIndex(IDs: string[]) {dispatch(setIndexList(IDs))}
    function pushMovies(movies: Movie[]) {dispatch(addMovies(movies))}
    function updatePages(pages: number) {dispatch(setPages(pages))}
    const fetchUpdate = {
        setIndex: setIndex,
        pushMovies: pushMovies,
        updatePages: updatePages,
        setGenres: setGenres,
        setError: setError,
    }

    // Henter filter fra Redux
    const state = useSelector((state: State) => state);

    // Funksjon som refresher filmene
    function refresh(page: number = state.page) {
        setIndex([])
        fetchMovies(fetchUpdate, state, false, page)
    }

    if (first) {
        fetchMovies(fetchUpdate, state, true, state.page);
        setFirst(false);
    }

    const classes = makeStyles({
        root: {
            height: '100%',
            overflow: 'hidden',
        },
        mainBox: {
            position: 'absolute',
            width: '100%',
            top: useMediaQuery('(max-width: 1400px)').valueOf() ? '220px' : '120px',
            flexDirection: useMediaQuery('(min-width: 1401px)').valueOf() ?'row':'column',
            alignItems: 'center',
        },
        wide: {
            display: useMediaQuery('(min-width: 1401px)').valueOf() ? 'initial' : 'none'
        },
    })

    // Returnerer Main appen
    return (
        <div className={classes().root}>
            <Header refresh={refresh}/>
            <div className={classes().mainBox}>
                <div className={classes().wide}>
                    <ControlPanel mobile={false} refresh={refresh}/>
                </div>
                <FilterSortContainer refresh={refresh}/>
                <MovieSection error={error} refresh={refresh}/>
            </div>
        </div>
    );
}

export default App;
