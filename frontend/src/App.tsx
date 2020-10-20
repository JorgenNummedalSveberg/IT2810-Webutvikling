import React, {useState, useEffect} from 'react';
import './CSS/App.css';
import Header from "./Components/Header";
import MainContent from './Components/MainContent';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import _ from 'lodash';
import {Card, Icon, Image, Dropdown} from 'semantic-ui-react';

function App() {
    const [movies, setMovies] = useState(undefined);
    const [genres, setGenres] = useState(undefined);
    useEffect( () => {fetchMovies(setMovies, setGenres, undefined)}, [])
    function updateMovies(genre: any) {
        fetchMovies(setMovies, setGenres, genre)
    }
  return (
    <div className="App">
      <Header/>
      <MainContent/>
      <header className="App-header">
          <GenreSelector update={updateMovies} genres={genres}/>
          <MovieCardGroup movies={movies}/>
      </header>
    </div>
  );
}

function fetchMovies(setMovies: any, setGenres: any, genre: any) {
    let url = 'http://localhost:5000/api/movies';
    console.log(genre);
    if (genre) {
        url = 'http://localhost:5000/api/searchByGenre/'+genre;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            setMovies(data);
            const genres = genreUpdate(data);
            setGenres(genres);
        });
}

interface genre {
    text: string
}

function genreUpdate(movies: any) {
    const genreList = movies.map((movie: any) => movie.genres)
    let genres: string[] = [];
    genreList.forEach((movieGenres: string[]) => {
        movieGenres.forEach((genre: string) => {
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        })
    })
    return genres.map(genre => {
        return {key: genre, text: genre, value: genre};
    });
}

function GenreSelector(props: {genres: any, update: any}) {
    function onSearchChange(e: any, data: any) {
        props.update(data.value);
    }
    return (
        <Dropdown
            placeholder={"Select genre"}
            fluid
            selection
            onChange={onSearchChange}
            options={props.genres}
        />
    )
}

function MovieCardGroup(props: {movies: any | string}) {
    const movieCards = (typeof props.movies === "undefined") ? (
        <div>
            No movies
        </div>
    ) : props.movies.map((movie: any, index: number) => {
        return (
            <MovieCard movie={movie} key={index}/>
        )
    })
    return (
        <Card.Group className={"CardGroup"} centered>
            {movieCards}
        </Card.Group>
    )
}

interface Movie {
    actors: string[],
    genres: string[],
    averageRating: number,
    contentRating: string,
    duration: string,
    id: string,
    imdbRating: number,
    originalTitle: string,
    poster: string,
    posterurl: string,
    ratings: number[],
    releaseDate: string,
    storyline: string,
    title: string,
    year: string,
    _id: string
}

function MovieCard(props: {movie: any}) {
    return(
      <Card className={"movieCard"}>
        <Image src={props.movie.posterurl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.movie.title}</Card.Header>
          <Card.Meta>
            <span className='date'>
                <p>Rating: {parseAverage(props.movie.ratings)}</p>
                <p>Imdb: {props.movie.imdbRating}</p>
            </span>
          </Card.Meta>
          <Card.Description>
              Genres: {props.movie.genres}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='hourglass' />
              {parseTime(props.movie.duration)}
          </a>
        </Card.Content>
      </Card>
  )
}

function parseAverage(ratings: number[]) {
    let sum = 0;
    ratings.forEach(x => sum += x);
    return Math.floor(sum*10/ratings.length)/10;
}

function parseTime(time: string) {
    let minutes = parseInt(time.substring(2).slice(0, -1));
    let hours = 0;
    while (minutes-60 > 0){
        minutes -= 60;
        hours++;
    }
    return (hours+"h "+ minutes+"m");
}

export default App;
