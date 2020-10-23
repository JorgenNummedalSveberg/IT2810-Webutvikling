import React from 'react';
import './CSS/GridView.css';
import {Card, Icon, Grid, Image} from 'semantic-ui-react';
import ImdbIcon from "./ImdbIcon";
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {parseTime} from '../App';
import {setDetailsState} from "../actions";
import {Movie} from "../types/Movie";


// Komponent som viser frem alle filmene i en responsiv grid
function GridView() {

    // Henter filmene inn fra state
    const movies = useSelector((state: state) => state.movies);

    // Lager en liste av alle MovieCards som skal med i Griden
    const movieCards = movies.map((movie: any, index: number) => {
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

// Komponent for å vise frem en film
function MovieCard(props: {movie: any}) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(setDetailsState({show: true, movie: (props.movie as Movie)}))
    }
    return(
        <Card className={"movieCard"} style={{backgroundColor: '#464646'}} onClick={handleClick}>
            <Image src={props.movie.posterurl} wrapped ui={false} />
            <Card.Content>
                <Card.Header style={{color: 'white'}} >{props.movie.title}</Card.Header>
                <Card.Description style={{color: '#e5dfca'}}>
                    Genres: {props.movie.genres}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Grid centered style={{margin: '5px'}}>
                    <div style={{color: '#e5dfca', margin: 'auto'}}>
                        <Icon name='hourglass' />
                        {parseTime(props.movie.duration, false)}
                    </div>
                    <ImdbIcon rating={props.movie.imdbRating}/>
                </Grid>
            </Card.Content>
        </Card>
    )
}

export default GridView;