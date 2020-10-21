import React, {useState, useEffect} from 'react';
import './CSS/App.css';
import Header from "./Components/Header";
import MainContent from './Components/MainContent';
import 'semantic-ui-css/semantic.min.css'

function App() {
    const [movies, setMovies] = useState(undefined);
    const [genres, setGenres] = useState(undefined);
    useEffect( () => {fetchMovies(setMovies, setGenres, false, "")}, [])
    function updateMovies(genre: any) {
        fetchMovies(setMovies, setGenres, true, genre)
    }
    function updateSearch(string: string) {
        fetchMovies(setMovies, setGenres, false, string);
    }
  return (
    <div className="App">
      <Header updateSearch={updateSearch}/>
      <MainContent update={updateMovies} genres={genres} movies={movies}/>
    </div>
  );
}

function fetchMovies(setMovies: any, setGenres: any, genreSearch: boolean, search: any) {
    let url;
    if (search === "") {
        url = 'http://localhost:5000/api/movies';
    } else if (genreSearch) {
        url = 'http://localhost:5000/api/searchByGenre/'+search;
    } else {
        url = 'http://localhost:5000/api/movie/'+search
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            setMovies(data);
            const genres = genreUpdate(data);
            setGenres(genres);
        });
}

function genreUpdate(movies: any) {
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
