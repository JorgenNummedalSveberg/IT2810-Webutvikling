import React, {useEffect, useState} from 'react';
import './CSS/Popup.css';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import { Image, Grid, Header, Button} from "semantic-ui-react";
import {setPopup, showPopup} from "../actions";
import ImdbIcon from "./ImdbIcon";
import {stringify} from "querystring";


function Popup() {
    // Henter filmen fra redux
    const movie = useSelector((state: state) => state.details.movie);

    const [viewedMovies, setViewedMovies]: any[] = useState([]);
    const [watches, setWatches] = useState(movie.watches);

    function fetchViewed(): any[] {
        try {
            const item = localStorage.getItem('viewed');
            return item ? JSON.parse(item) : []
        } catch (e) {
            return [];
        }
    }

    useEffect(() => {
        setViewedMovies(fetchViewed());
    }, [])

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Lukker popup
    function hidePopup() {
        dispatch(showPopup(false));
    }

    // Legger til en view
    function addView() {
        movie.watches++;
        setWatches(watches+1);
        fetch('http://localhost:5000/api/movie/addView/'+movie._id);
        let tempViewedMovies = viewedMovies;
        tempViewedMovies.push(movie._id);
        localStorage.setItem('viewed', JSON.stringify(tempViewedMovies));
        setViewedMovies(tempViewedMovies);
        dispatch(setPopup(movie));
    }

    return (
        // marginRight her er 20px større fordi den blir offset av GridView
        // @ts-ignore
        <div style={{marginRight: '50px', marginLeft: '30px', position: 'fixed', zIndex: '1000', backgroundColor: 'white', padding: '10px', borderRadius: '16px'}}>
            <Button style={{margin: '20px'}} onClick={hidePopup} content='Back' icon='left arrow' labelPosition='left' />
            <Grid style={{margin: '20px'}}>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Image style={{border: 'solid 5px grey'}} src={movie.posterurl} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header>
                            {movie.title}
                        </Header>
                        <p>{movie.year}</p>
                        <ImdbIcon rating={movie.imdbRating}/>
                        <Button disabled={viewedMovies.includes(movie._id)} onClick={addView} color='blue' content='Watched' icon='eye' label={{ basic: true, color: 'blue', pointing: 'left', content: movie.watches }}/>
                        <h2>{movie.genres}</h2>
                        <p>
                            {movie.storyline}
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Popup;