import React, {useCallback, useState} from 'react';
import Header from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {addMovies, setGenresState, setIndexList, setMovieState, setPages} from "./actions";
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

// Ulike ting vi sorterer etter, komponenten returnerer en knapp for hvert element
export const sortBy = ["Name", "Rating", "Length", "Year"];


// App komponenten setter default state, og har ansvar for å hente inn filmer og behandle dem
function App() {

    const [error, setError] = useState(false);
    const [first, setFirst] = useState(true);

    // Nødvendig definisjon for redux
    const dispatch = useDispatch();

    // Setter filmer
    const setMovies = useCallback((movies: Movie[], pages: number) => {
        dispatch(setMovieState({movies: movies, pages: pages}));
    }, [dispatch])

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

    // Henter filter fra Redux
    const state = useSelector((state: State) => state);

    // Funksjon som refresher filmene
    function refresh(page: number = state.page) {
        setMovies([], state.pages);
        fetchMovies(setIndex, pushMovies, updatePages, setGenres, state, false, setError, page)
    }

    if (first) {
        fetchMovies(setIndex, pushMovies, updatePages, setGenres, state, true, setError, state.page);
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

// Henter inn filmer, og sorterer basert på et filter
function fetchMovies(
    setIndex: (list: string[]) => void,
    pushMovies: (list: Movie[]) => void,
    updatePages: (pages: number) => void,
    setGenres: (genres: string[]) => void,
    state: State,
    first: boolean,
    setError: (error: boolean) => void,
    page: number) {

    const body = {
        genre: state.filter.genre === "Select genre..." ? "" : state.filter.genre,
        title: state.filter.search,
        sort: state.filter.sort,
        desc: state.filter.desc,
        yearRange: state.filter.year,
        scoreRange: state.filter.score,
        user: !!state.user && state.filter.myMovies ? state.user.userName : "",
        page: page
    }

    const req = ({
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const IDreq = (idList: string[]) => {
        return ({
            method: 'POST',
            body: JSON.stringify({ids: idList}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    setIndex([])
    fetch('http://localhost:5000/api/movies/nice', req)
        .then(response => {
            if (response.ok) {
                response.json().then((response: any) => {
                    let data = response.movies;
                    setIndex(data);
                    const pages = response.pages;
                    data = data.filter((id: string) => !state.movieCache.map(movie => movie._id).includes(id))
                    if (pages > 0) {
                        setError(false);
                        if (data.length > 0) {
                            fetch('http://localhost:5000/api/movies', IDreq(data))
                                .then(response => {
                                    if (response.ok) {
                                        response.json().then((response: Movie[]) => {
                                            const movies = response;
                                            pushMovies(movies)
                                            updatePages(pages)
                                            // Bare oppdater sjanger listen hvis det er første gang vi laster inn
                                            if (first) {
                                                genreUpdate(movies.map((movie: any) => movie.genres), setGenres);
                                            }
                                        })
                                    } else {
                                        setError(true);
                                    }
                                })
                        }
                    } else {
                        setError(true);
                    }
                })
            } else {
                setError(true);
            }
        })
}

// Setter sjangrene i state
function genreUpdate(movies: any[], setGenres: any) {
    let genres = ["Select genre..."];
    movies.forEach((movieGenres: string[]) => {
        movieGenres.forEach((genre: string) => {
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        })
    })
    setGenres(genres);
}

export default App;
