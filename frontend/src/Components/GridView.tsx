import React from 'react';
import './CSS/GridView.css';
import {Card, Icon, Grid, Image} from 'semantic-ui-react';
import ImdbIcon from "./ImdbIcon";
import {useSelector} from "react-redux";
import {state} from "../types/state";

function GridView(props: {movies: any | string}) {
    const movies = useSelector((state: state) => state.movies);
    const movieCards = (typeof movies === "undefined") ? (
        <div>
        </div>
    ) : movies.map((movie: any, index: number) => {
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

function MovieCard(props: {movie: any}) {
    const textStyle = {
        color: '#e5dfca'
    }
    const imdbstyle = {
    }
    return(
        <Card className={"movieCard"} style={{backgroundColor: '#464646'}} onClick={() => {}}>
            <Image src={props.movie.posterurl} wrapped ui={false} />
            <Card.Content>
                <Card.Header style={{color: 'white'}} >{props.movie.title}</Card.Header>
                <Card.Description style={textStyle}>
                    Genres: {props.movie.genres}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Grid centered style={{margin: '5px'}}>
                    <div style={{color: '#e5dfca', margin: 'auto'}}>
                        <Icon name='hourglass' />
                        {parseTime(props.movie.duration)}
                    </div>
                    <ImdbIcon rating={props.movie.imdbRating}/>
                </Grid>
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
    let returnString = hours+"h "+ minutes+"m"
    return isNaN(minutes) ? "--:--" : returnString;
}

export default GridView;