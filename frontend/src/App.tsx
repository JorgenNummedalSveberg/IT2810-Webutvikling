import React, {useCallback, useState} from 'react';
import Header from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {addMovies, setGenresState, setIndexList, setPages} from "./actions";
import {State} from "./types/State";
import {Movie} from "./types/Movie";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import MovieSection from "./Components/MovieSection/MovieSection";
import TuneIcon from '@material-ui/icons/Tune';
import {Button, Drawer, useMediaQuery} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SortButton from "./Components/Header/SortButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {fetchMovies} from "./movieService";

// Ulike ting vi sorterer etter, komponenten returnerer en knapp for hvert element
export const sortBy = ["Name", "Rating", "Length", "Year"];


// App komponenten setter default state, og har ansvar for å hente inn filmer og behandle dem
function App() {

    const [error, setError] = useState(false);
    const [first, setFirst] = useState(true);

    // Nødvendig definisjon for redux
    const dispatch = useDispatch();

    // Setter sjangre
    const setGenres = useCallback((genres: string[]) => {
        dispatch(setGenresState(genres))
    }, [dispatch])

    // Setter IndexList
    const setIndex = useCallback((IDs: string[]) => {
        dispatch(setIndexList(IDs))
    }, [dispatch])

    // Oppdaterer FilmeCache
    const pushMovies = useCallback((movies: Movie[]) => {
        dispatch(addMovies(movies))
    }, [dispatch])

    // Oppdaterer FilmeCache
    const updatePages = useCallback((pages: number) => {
        dispatch(setPages(pages))
    }, [dispatch])

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
        header: {
            height: useMediaQuery('(max-width: 1400px)').valueOf() ? '220px' : '120px',
            position: 'fixed',
            width: '100%',
            zIndex: 100
        },
        mainBox: {
            position: 'absolute',
            width: '100%',
            top: useMediaQuery('(max-width: 1400px)').valueOf() ? '220px' : '120px',
        },
        row: {
            flexDirection: 'row'
        },
        column: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        movieSection: {
            marginLeft: useMediaQuery('(max-width: 1400px)').valueOf() ? '' : '500px',
        },
        filterButton: {
            fontSize: '2em',
            backgroundColor: 'rgb(200, 200, 200, 0.5)',
            padding: '0 20px 0 20px',
            margin: '20px 10px 20px 10px'
        },
        sorting: {
            backgroundColor: '#40798C',
            display: 'flex',
            justifyContent: 'center',
            height: '200px',
            padding: '40px',
            '& *': {
                margin: '10px',
                fontSize: '1.3em'
            }
        },
        wide: {
            display: useMediaQuery('(min-width: 1401px)').valueOf() ? 'initial' : 'none'
        },
        thin: {
            display: useMediaQuery('(max-width: 1400px)').valueOf() ? 'flex' : 'none',
            justifyContent: 'center',
            textAlign: 'center'
        },
    })

    const [openSorting, setSortingOpen] = useState(false)
    const [openFilter, setFilterOpen] = useState(false)

    const filterButton = (
        <Button
            className={classes().filterButton}
            startIcon={<TuneIcon/>}
            onClick={() => setFilterOpen(true)}
        >Filters
        </Button>
    )

    const sortButton = (
        <Button
            className={classes().filterButton}
            startIcon={<ExpandMoreIcon/>}
            onClick={() => setSortingOpen(true)}
        >Sort by
        </Button>
    )

    // Returnerer Main appen
    return (
        <div className={classes().root}>
            <div className={classes().header}>
                <Header refresh={refresh}/>
            </div>
            <div
                className={`${classes().mainBox} ${useMediaQuery('(min-width: 1401px)').valueOf() ? classes().row : classes().column}`}>
                <div className={classes().wide}>
                    <ControlPanel mobile={false} refresh={refresh}/>
                </div>
                <div className={classes().thin}>
                    {sortButton}
                    <Drawer anchor={'top'} open={openSorting} onClose={() => setSortingOpen(false)}>
                        <Button startIcon={<ArrowBackIcon/>} onClick={() => setSortingOpen(false)}>Close</Button>
                        <div className={classes().sorting}>
                            {sortBy.map((sort, index) => (
                                <SortButton mobile={true} key={index} sort={sort} refresh={refresh}
                                            nummer={index.toString()}/>
                            ))}
                        </div>
                    </Drawer>
                    {filterButton}
                    <Drawer anchor={'left'} open={openFilter} onClose={() => setFilterOpen(false)}>
                        <Button startIcon={<ArrowBackIcon/>} onClick={() => setFilterOpen(false)}>Close</Button>
                        <ControlPanel mobile={true} refresh={refresh}/>
                    </Drawer>
                </div>
                <div className={classes().movieSection}>
                    <MovieSection error={error} refresh={refresh}/>
                </div>
            </div>
        </div>
    );
}

export default App;
