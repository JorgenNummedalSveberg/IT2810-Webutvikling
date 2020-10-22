import React, {useEffect} from 'react';
import './CSS/App.css';
import Header from "./Components/Header";
import MainContent from './Components/MainContent';
import 'semantic-ui-css/semantic.min.css'
import {useSelector, useDispatch} from "react-redux";
import {setDesc, setGenre, setGenresState, setMovieState, setSearch, setSort} from "./actions";
import {filter} from "./types/filter";
import {state} from "./types/state";
import {Movie} from "./types/Movie";

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
    function setFilter(filter: filter) {
        dispatch(setDesc(filter.desc));
        dispatch(setSearch(filter.search));
        dispatch(setGenre(filter.genre));
        dispatch(setSort(filter.sort));
    }

    // Henter filter fra Redux
    const filter = useSelector((state: state) => state.filter);
    // Henter filmer fra Redux
    const movies = useSelector((state: state) => state.movies);

    // Setter et default filter og henter filmer en gang på starten
    useEffect( () => {
        setFilter({desc: true, sort: "Name", search: "", genre: ""});
        fetchMovies(setMovies, setGenres, filter, true)
    }, [])

    // Funksjon som refresher filmene
    function refresh() {
        fetchMovies(setMovies, setGenres, filter, false)
    }

    // Returnerer Main appen
    return (
    <div className="App">
      <Header refresh={refresh}/>
      <MainContent refresh={refresh} movies={movies}/>
    </div>
  );
}


// Henter inn filmer, og sorterer basert på et filter
function fetchMovies(setMovies: any, setGenres: any, filter: filter, first: boolean) {

    // Setter en base url, og endrer basert på filteret
    let url = 'http://localhost:5000/api/movies';
    if (filter.genre !== "" && filter.search !== "") {
        url = 'http://localhost:5000/api/movies/'+filter.genre+'/'+filter.search;
    } else if (filter.genre !== "") {
        url = 'http://localhost:5000/api/searchByGenre/'+filter.genre;
    } else if (filter.search !== "") {
        url = 'http://localhost:5000/api/movie/'+filter.search
    }
    fetch(url)
        .then(response => response.json())
        .then((data: any[]) => {

            // Sorterer filmene basert på hvilken kategori vi sorterer etter
            switch (filter.sort) {
                case "Name":
                    data.sort((b: Movie, a: Movie) => {
                        if(a.title < b.title) { return -1; }
                        if(a.title > b.title) { return 1; }
                        return 0;
                    });
                    break;
                case "Rating":
                    data.sort((a: Movie, b: Movie) => a.imdbRating - b.imdbRating);
                    break
                case "Duration":
                    data.sort((a: Movie, b: Movie) => {
                        return (parseTime(a.duration, true) as number) - (parseTime(b.duration, true) as number);
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
        });
}

// Tar inn tid i formatet på databasen og gjør det om til presentabel string, eller rein minuttverdi
export function parseTime(time: string, minFormat: boolean): number | string {
    let minutes = parseInt(time.substring(2).slice(0, -1));
    if (minFormat) {
        return minutes;
    } else {
        let hours = 0;
        while (minutes-60 > 0){
            minutes -= 60;
            hours++;
        }
        let returnString = hours+"h "+ minutes+"m"
        return isNaN(minutes) ? "--:--" : returnString;
    }
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
