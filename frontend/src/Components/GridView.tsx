import React, {useEffect, useState} from 'react';
import './CSS/GridView.css';
import {Card, Icon, Grid, Image, Pagination, Dimmer, Loader} from 'semantic-ui-react';
import ImdbIcon from "./ImdbIcon";
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {setPopup, showPopup} from "../actions";
import Popup from './Popup';
import {Movie} from "../types/Movie";


// Komponent som viser frem alle filmene i en responsiv grid
function GridView() {
    // Henter popup details fra state
    const showPopup = useSelector((state: state) => state.details.show);

    // State for å holde styr på hvilen side vi er på
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

    const dimList = () => {
        const list = [];
        for(let i = 0; i < 20; i++) {
            list.push(<DimCard key={i}/>);
        }
        return list;
    }
    // Lager en liste av alle MovieCards som skal med i Griden
    let movieCards: any[] = dimList();
    if (typeof movieList[page] !== "undefined") {
        movieCards = movieList[page].map((movie: any, index: number) => {
            return (
                <MovieCard movie={movie} key={index}/>
            )
        })
    }

    return (
        <div className={"GridView"}>
            {showPopup ?
                <Popup/> : null
            }
            <Card.Group style={{marginBottom: "20px", marginTop:"20px"}} centered>
                {movieCards}
            </Card.Group>
            <Pagination
                style={{marginBottom: "20px"}}
                onPageChange={(e, {activePage}) => {setPage((activePage as number)-1)}}
                defaultActivePage={1}
                totalPages={movieList.length} />
        </div>
    )
}

// Komponent for å vise frem en film
function MovieCard(props: {movie: Movie}) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Åpner opp Popup.
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
                        {parseTime(props.movie.duration)}
                    </div>
                    <ImdbIcon rating={props.movie.imdbRating}/>
                </Grid>
            </Card.Content>
        </Card>
    )
}

// Tar inn tid i formatet på databasen og gjør det om til presentabel string, eller rein minuttverdi
function parseTime(time: number): string {
    let minutes = time;
    let hours = 0;
    while (minutes-60 > 0) {
        minutes -= 60;
        hours++;
    }
    return hours+'h'+minutes+'m';
}

function DimCard() {
    return (
        <Card className={"movieCard"} style={{backgroundColor: '#464646', overflow: 'hidden', zIndex:"8"}}>
            <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>
            <Image src={'../../dimPoster.png'} wrapped ui={false}/>
        </Card>
    )
}

export default GridView;