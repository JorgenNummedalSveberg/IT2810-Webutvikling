import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addMovies, setGenresState, setIndexList, setPages} from "./actions";
import {State} from "./types/State";
import {Movie} from "./types/Movie";
import MovieSectionContainer from "./Components/MovieSection/MovieSectionContainer";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {fetchMovies} from "./movieService";
import FilterSortContainer from "./Components/FilterSort/FilterSortContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import ControlPanelContainer from "./Components/ControlPanel/ControlPanelContainer";

// Ulike ting vi sorterer etter, komponenten returnerer en knapp for hvert element
export const sortBy = ["Name", "Rating", "Length", "Year"];


// App komponenten setter default state, og har ansvar for å hente inn filmer og behandle dem
function App() {

    // Holder styr på om det skal vises error, og om det er første gang vi henter filmer eller ikke
    const [error, setError] = useState(false);
    const [first, setFirst] = useState(true);


    // Et samlet objekt med funksjoner som fetchMovies skal bruke
    const dispatch = useDispatch();
    const fetchUpdate = {
        setIndex: (IDs: string[]) => dispatch(setIndexList(IDs)),
        pushMovies: (movies: Movie[]) => dispatch(addMovies(movies)),
        updatePages: (pages: number) => dispatch(setPages(pages)),
        setGenres: (genres: string[]) => dispatch(setGenresState(genres)),
        setError: setError,
    }

    // Henter filter fra Redux
    const state = useSelector((state: State) => state);

    // Funksjon som refresher filmene
    function refresh(page: number = state.page) {
        dispatch(setIndexList([]))
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
            flexDirection: useMediaQuery('(min-width: 1401px)').valueOf() ? 'row' : 'column',
            alignItems: 'center',
        },
        wide: {
            display: useMediaQuery('(min-width: 1401px)').valueOf() ? 'initial' : 'none'
        },
    })

    // Returnerer Main appen
    return (
        <div className={classes().root}>
            <HeaderContainer refresh={refresh}/>
            <div className={classes().mainBox}>
                <div className={classes().wide}>
                    <ControlPanelContainer mobile={false} refresh={refresh}/>
                </div>
                <FilterSortContainer refresh={refresh}/>
                <MovieSectionContainer error={error} refresh={refresh}/>
            </div>
        </div>
    );
}

export default App;
