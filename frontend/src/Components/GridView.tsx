import React from 'react';
import './CSS/GridView.css';
import {Card, Icon, Image} from 'semantic-ui-react';

function GridView(props: {movies: any | string}) {
    const movieCards = (typeof props.movies === "undefined") ? (
        <div>
        </div>
    ) : props.movies.map((movie: any, index: number) => {
        return (
            <MovieCard movie={movie} key={index}/>
        )
    })
    return (
        <Card.Group className={"GridView"} centered>
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
    const textStyle = {
        color: '#e5dfca'
    }
    return(
        <Card className={"movieCard"} style={{backgroundColor: '#464646'}} onClick={() => {}}>
            <Image src={props.movie.posterurl} wrapped ui={false} />
            <Card.Content>
                <Card.Header style={{color: 'white'}} >{props.movie.title}</Card.Header>
                <Card.Meta>
            <span className='date' style={textStyle}>
                <p>Rating: {parseAverage(props.movie.ratings)}</p>
                <p>Imdb: {props.movie.imdbRating}</p>
            </span>
                </Card.Meta>
                <Card.Description style={textStyle}>
                    Genres: {props.movie.genres}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a style={textStyle}>
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

export default GridView;