import React, {useCallback, useEffect, useState} from 'react';
import Header from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {setDesc, setGenre, setGenresState, setMovieState, setSearch, setSort} from "./actions";
import {Filter} from "./types/Filter";
import {State} from "./types/State";
import {Movie} from "./types/Movie";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import MovieSection from "./Components/MovieSection/MovieSection";
import TuneIcon from '@material-ui/icons/Tune';
import {Button, Drawer, Grid, useMediaQuery} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {collectVariableUsage} from "tsutils";


// App komponenten setter default state, og har ansvar for å hente inn filmer og behandle dem
function App() {

    // Nødvendig definisjon for redux
    const dispatch = useDispatch();

    // Setter filmer
    const setMovies = useCallback((movies: any[]) => {
        dispatch(setMovieState(movies));
    }, [dispatch])

    // Setter sjangre
    const setGenres = useCallback((genres: string[]) => {
        dispatch(setGenresState(genres))
    }, [dispatch])

    // Henter filter fra Redux
    const filter = useSelector((state: State) => state.filter);

    // Setter et default filter og henter filmer en gang på starten
    useEffect(() => {
        fetchMovies(setMovies, setGenres, filter, true)
    }, [filter, setGenres, setMovies])

    // Funksjon som refresher filmene
    function refresh() {
        setMovies([]);
        fetchMovies(setMovies, setGenres, filter, false)
    }

    //Brukes for å skru av og på burgermenyen
    let [showMenu, setShowMenu] = useState(false);

    const classes = makeStyles({
        root: {
            height: '100%',
            overflow: 'hidden',
        },
        header: {
            height: useMediaQuery('(max-width: 1400px)').valueOf()?'20%': '10%'
        },
        mainBox: {
            display: 'flex',
            height: useMediaQuery('(max-width: 1400px)').valueOf()?'80%': '90%'
        },
        row: {
            flexDirection: 'row'
        },
        column: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        movieSection: {
            height: useMediaQuery('(max-width: 1400px)').valueOf()?'90%': '100%'
        },
        filterButton: {
            fontSize: '2em',
            backgroundColor: 'rgb(200, 200, 200, 0.5)',
            padding: '0 20px 0 20px',
            margin: '20px 0 20px 0'
        }
    })

    const [openDrawer, setOpenDrawer] = useState(false)

    const filterButton = (
        <Button
            className={classes().filterButton}
            startIcon={<TuneIcon/>}
            onClick={()=> setOpenDrawer(true)}
        >Filters
        </Button>
    )
    // Returnerer Main appen
    return (
        <div className={classes().root}>
            <div className={classes().header} >
                <Header refresh={refresh}/>
            </div>
            <div className={`${classes().mainBox} ${useMediaQuery('(min-width: 1400px)').valueOf() ? classes().row : classes().column}`}>
                {useMediaQuery('(min-width: 1400px)').valueOf()?
                    <div><ControlPanel refresh={refresh} show={showMenu}/></div>
                    :
                    <div>
                        {filterButton}
                        <Drawer anchor={'left'} open={openDrawer} onClose={()=> setOpenDrawer(false)}>
                            <ControlPanel refresh={refresh} show={showMenu}/>
                        </Drawer>
                    </div>}
                <div className={classes().movieSection}>
                    <MovieSection/>
                </div>
            </div>
        </div>
    );
}

// Henter inn filmer, og sorterer basert på et filter
function fetchMovies(setMovies: any, setGenres: any, filter: Filter, first: boolean) {
    fetch('http://localhost:5000/api/movies?genre='
        + (filter.genre==="Select genre..."?"":filter.genre)
        + '&title='+ filter.search)
        .then(response => {
            if (response.ok) {
                response.json().then((data: any[]) => {
                    if (data.length > 0) {
                        // Sorterer filmene basert på hvilken kategori vi sorterer etter
                        switch (filter.sort) {
                            case "Name":
                                data.sort((b: Movie, a: Movie) => {
                                    if (a.title < b.title) {
                                        return -1;
                                    }
                                    if (a.title > b.title) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                break;
                            case "Rating":
                                data.sort((a: Movie, b: Movie) => a.imdbRating - b.imdbRating);
                                break
                            case "Duration":
                                data.sort((a: Movie, b: Movie) => {
                                    return a.duration - b.duration;
                                });
                                break;
                            case "Year":
                                data.sort((a: Movie, b: Movie) => parseInt(a.year) - parseInt(b.year))
                        }

                        // Setter filmene i redux state, reverserer listen om vi sorterer descending
                        setMovies(filter.desc ? data.reverse() : data);

                        // Bare oppdater sjanger listen hvis det er første gang vi laster inn
                        if (first) {
                            genreUpdate(data.map((movie: any) => movie.genres), setGenres);
                        }
                    }
                })} else {
                setMovies({error: "no movies"});
            }})
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
