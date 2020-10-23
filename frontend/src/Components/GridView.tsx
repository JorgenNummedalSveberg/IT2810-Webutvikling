import React from 'react';
import './CSS/GridView.css';
import {Card, Icon, Grid, Image} from 'semantic-ui-react';
import ImdbIcon from "./ImdbIcon";
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {parseTime} from '../App';
import {setPopup, showPopup} from "../actions";
import Popup from './Popup';
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


    // Henter popup details fra state
    const showPopup = useSelector((state: state) => state.details.show);

    return (
        <div className={"GridView"}>
            {showPopup ?
                <Popup/> : null
            }
            <Card.Group centered>
                {movieCards}
            </Card.Group>
        </div>
    )
}

// Komponent for å vise frem en film
function MovieCard(props: {movie: Movie}) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Legger til en visit på filmen
    function addVisit(id: any) {
        fetch('http://localhost:5000/api/movie/addVisit/'+id);
    }

    // Håndterer alt når du trykker på Card. Legger til visit og får opp Popup.
    function handleClick() {
        addVisit(props.movie._id);
        props.movie.visits ++;
        dispatch(setPopup(props.movie));
        dispatch(showPopup(true));
    }

    return(
        <Card className={"movieCard"} style={{backgroundColor: '#464646'}} onClick={handleClick}>
            <Image src={props.movie.posterurl} wrapped ui={false}/>
            <Card.Content>
                <Card.Header style={{color: 'white'}}>{props.movie.title}</Card.Header>
                <Card.Description style={{color: '#e5dfca'}}>
                    Genres: {props.movie.genres}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Grid centered style={{margin: '5px'}}>
                    <div style={{color: '#e5dfca', margin: 'auto'}}>
                        <Icon name='hourglass'/>
                        {parseTime(props.movie.duration, false)}
                    </div>
                    <ImdbIcon rating={props.movie.imdbRating}/>
                </Grid>
            </Card.Content>
        </Card>
    )
}

export default GridView;