import React, {useState, useEffect} from 'react';
import './CSS/App.css';
import Header from "./Components/Header";
import MainContent from './Components/MainContent';
import 'semantic-ui-css/semantic.min.css'
import {useSelector, useDispatch} from "react-redux";
import {setDesc, setFilterState, setGenre, setGenresState, setMovieState, setSearch, setSort} from "./actions";
import {filter} from "./types/filter";
import {state} from "./types/state";

function App() {
    const dispatch = useDispatch();
    function setMovies(movies: any[]) {
        dispatch(setMovieState(movies));
    }
    function setGenres(genres: string[]) {
        dispatch(setGenresState(genres))
    }
    function setFilter(filter: filter) {
        dispatch(setDesc(filter.desc));
        dispatch(setSearch(filter.search));
        dispatch(setGenre(filter.genre));
        dispatch(setSort(filter.sort));
    }
    const filter = useSelector((state: state) => state.filter);
    const movies = useSelector((state: state) => state.movies);
    useEffect( () => {
        setFilter({desc: true, sort: "Name", search: "", genre: ""});
        fetchMovies(setMovies, setGenres, filter, true)
    }, [])
    function refresh() {
        fetchMovies(setMovies, setGenres, filter, false)
    }
    return (
    <div className="App">
      <Header refresh={refresh}/>
      <MainContent refresh={refresh} movies={movies}/>
    </div>
  );
}

function fetchMovies(setMovies: any, setGenres: any, filter: filter, first: boolean) {
    let url = 'http://localhost:5000/api/movies';
    console.log(filter);
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
            switch (filter.sort) {
                case "Name":
                    // @ts-ignore
                    data.sort((b: Movie, a: Movie) => {
                        if(a.title < b.title) { return -1; }
                        if(a.title > b.title) { return 1; }
                        return 0;
                    });
                    break;
                case "Rating":
                    // @ts-ignore
                    data.sort((a: Movie, b: Movie) => a.imdbRating - b.imdbRating);
                    break
                case "Duration":
                    // @ts-ignore
                    data.sort((a: Movie, b: Movie) => {
                        return (parseTime(a.duration, true) as number) - (parseTime(b.duration, true) as number);
                    });
                    break;
                case "Yeah":
                    // @ts-ignore
                    data.sort((a: Movie, b: Movie) => parseInt(a.year) - parseInt(b.year))
            }
            setMovies(data);
            if (first) {
                genreUpdate(data.map((movie: any) => movie.genres), setGenres);
            }
        });
}
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
