import React, {useEffect, useState} from 'react';
import './CSS/GridView.css';
import {Card, Icon, Grid, Image, Pagination} from 'semantic-ui-react';
import ImdbIcon from "./ImdbIcon";
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {parseTime} from '../App';
import {setPopup, showPopup} from "../actions";
import Popup from './Popup';


// Komponent som viser frem alle filmene i en responsiv grid
function GridView() {

    const [page, setPage] = useState(0);


    // Henter filmene inn fra state
    const movies = useSelector((state: state) => state.movies);

    const movieList: any[] = [];
    movies.forEach((movie, index) => {
        if (!movieList[Math.floor(index/20)]) {
            movieList[Math.floor(index/20)] = [];
        }
        movieList[Math.floor(index/20)].push(movie);
    })

    // Lager en liste av alle MovieCards som skal med i Griden
    let movieCards: any[] = []
    if (typeof movieList[page] !== "undefined") {
        movieCards = movieList[page].map((movie: any, index: number) => {
            return (
                <MovieCard movie={movie} key={index}/>
            )
        })
    }

    function updatePage(value: any) {
        setPage(value);
        console.log(value);
    }


    // Henter popup details fra state
    const showPopup = useSelector((state: state) => state.details.show);

    return (
        <div className={"GridView"}>
            {showPopup ?
                <Popup/> : null
            }
            <Pagination onPageChange={(event, {activePage}) => {updatePage(activePage)}} defaultActivePage={1} totalPages={movieList.length-1} />
            <Card.Group style={{padding: '20px'}} centered>
                {movieCards}
            </Card.Group>
        </div>
    )
}

// Komponent for å vise frem en film
function MovieCard(props: {movie: any}) {

    // Nødvendig for redux
    const dispatch = useDispatch();


    function handleClick() {
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