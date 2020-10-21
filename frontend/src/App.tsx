import React, {useState, useEffect} from 'react';
import './CSS/App.css';
import Header from "./Components/Header";
import MainContent from './Components/MainContent';
import 'semantic-ui-css/semantic.min.css'
import {useSelector, useDispatch} from "react-redux";
import {setFilterState, setGenresState, setMovieState} from "./actions";
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
    const filter = useSelector((state: state) => state.filter);
    const movies = useSelector((state: state) => state.movies);
    const genres = useSelector((state: state) => state.genres);
    useEffect( () => {
        fetchMovies(setMovies, filter)

    }, [])
    function updateMovies(genre: any) {
        fetchMovies(setMovies, filter)
    }
    function updateSearch(string: string) {
        fetchMovies(setMovies, filter)
    }
  return (
    <div className="App">
      <Header updateSearch={updateSearch}/>
      <MainContent update={updateMovies} genres={genres} movies={movies}/>
    </div>
  );
}

function fetchMovies(setMovies: any, filter: filter) {
    let url = 'http://localhost:5000/api/movies';
    if (filter.genre !== "" && filter.search !== "") {
        url = 'http://localhost:5000/api/movies/'+filter.genre+'/'+filter.search;
    } else if (filter.genre !== "") {
        url = 'http://localhost:5000/api/searchByGenre/'+filter.search;
    } else if (filter.search !== "") {
        url = 'http://localhost:5000/api/movie/'+filter.search
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            setMovies(data)
        });
}

function genreUpdate(movies: any[]) {
    const genreList = movies.map((movie: any) => movie.genres)
    let genres = ["Select genre..."];
    genreList.forEach((movieGenres: string[]) => {
        movieGenres.forEach((genre: string) => {
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        })
    })
    return genres.map((genre, index) => {
        if (index === 0) {
            return {key: "", text: "Select genre...", value: ""}
        } else {
            return {key: genre, text: genre, value: genre};
        }
    });
}

export default App;
