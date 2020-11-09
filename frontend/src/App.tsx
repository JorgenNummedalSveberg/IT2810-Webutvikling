import React, {useEffect, useState} from 'react';
import './CSS/App.css';
import Header from "./Components/Header/Header";
import 'semantic-ui-css/semantic.min.css'
import {useDispatch, useSelector} from "react-redux";
import {setDesc, setGenre, setGenresState, setMovieState, setSearch, setSort} from "./actions";
import {Filter} from "./types/Filter";
import {State} from "./types/State";
import {Movie} from "./types/Movie";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import MovieSection from "./Components/MovieSection/MovieSection";
import { Icon } from 'semantic-ui-react';

// App komponenten setter default state, og har ansvar for å hente inn filmer og behandle dem
function App() {

    // Nødvendig definisjon for redux
    const dispatch = useDispatch();

    // Setter filmer
    function setMovies(movies: any[]) {
        dispatch(setMovieState(movies));
    }

    // Setter sjangre
    function setGenres(genres: string[]) {
        dispatch(setGenresState(genres))
    }

    // Overordnet funksjon som setter alle filtere
    function setFilter(filter: Filter) {
        dispatch(setDesc(filter.desc));
        dispatch(setSearch(filter.search));
        dispatch(setGenre(filter.genre));
        dispatch(setSort(filter.sort));
    }

    // Henter filter fra Redux
    const filter = useSelector((state: State) => state.filter);

    // Setter et default filter og henter filmer en gang på starten
    useEffect(() => {
        setFilter({
            desc: true,
            sort: "Name",
            search: "",
            genre: "",
            score: [0, 10],
            year: [1900, 2020],
            duration: [0, 320],
            myMovies: false
        });
        fetchMovies(setMovies, setGenres, filter, true)
    }, [filter, setFilter, setGenres, setMovies])

    // Funksjon som refresher filmene
    function refresh() {
        setMovies([]);
        fetchMovies(setMovies, setGenres, filter, false)
    }

    //Brukes for å skru av og på burgermenyen
    let [showMenu, toggleShowMenu] = useState(false);

    function toggleMenu() {
        toggleShowMenu(!showMenu);
    }
    // Returnerer Main appen
    return (
        <div className="App">
            <Header refresh={refresh}/>
            <button className="FilterButton" onClick={toggleMenu}>
                <Icon name="sliders"/>
                {showMenu ? "Close filter":"Filter"}
            </button>
            <div className="MainContent">
                <ControlPanel refresh={refresh} show={showMenu}/>
                <MovieSection/>
            </div>
        </div>
    );
}

// Henter inn filmer, og sorterer basert på et filter
function fetchMovies(setMovies: any, setGenres: any, filter: Filter, first: boolean) {
    fetch('http://localhost:5000/api/movies?genre=' + filter.genre + '&title=' + filter.search)
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
