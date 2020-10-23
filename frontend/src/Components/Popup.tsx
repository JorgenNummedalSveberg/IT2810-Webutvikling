import React, {CSSProperties, useEffect, useState} from 'react';
import './CSS/Popup.css';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import { Image, Grid, Header, Button} from "semantic-ui-react";
import {setPopup, showPopup} from "../actions";
import ImdbIcon from "./ImdbIcon";


function Popup() {

    // Henter filmen fra redux
    const movie = useSelector((state: state) => state.details.movie);

    const [views, setViews] = useState(0);
    useEffect(() => {
        setViews(movie.watches);
    })

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Lukker popup
    function hidePopup() {
        dispatch(showPopup(false));
    }

    // Legger til en view
    function addView() {
        movie.watches ++;
        setViews(views+1);
        fetch('http://localhost:5000/api/movie/addView/'+movie._id);
    }

    return (
        // marginRight her er 20px større fordi den blir offset av GridView
        // @ts-ignore
        <div style={{marginRight: '50px', marginLeft: '30px', position: 'fixed', zIndex: '1000', backgroundColor: 'white', padding: '10px', borderRadius: '16px'}}>
            <Button style={{margin: '20px'}} onClick={hidePopup} content='Back' icon='left arrow' labelPosition='left' />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Image style={{border: 'solid 5px grey'}} src={movie.posterurl} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header>
                            {movie.title} | Visits: {movie.visits}
                        </Header>
                        <ImdbIcon rating={movie.imdbRating}/>
                        <Button onClick={addView} color='blue' content='Watched' icon='eye' label={{ basic: true, color: 'blue', pointing: 'left', content: views }}/>
                        <h1>{movie.year}</h1>
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