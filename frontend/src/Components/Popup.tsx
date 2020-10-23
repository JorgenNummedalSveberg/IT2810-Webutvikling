import React, {CSSProperties} from 'react';
import './CSS/Popup.css';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import { Image, Grid, Header, Button} from "semantic-ui-react";
import {showPopup} from "../actions";
import ImdbIcon from "./ImdbIcon";


function Popup() {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Lukker popup
    function hidePopup() {
        dispatch(showPopup(false));
    }

    // Henter filmen fra redux
    const movie = useSelector((state: state) => state.details.movie);

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
                            {movie.title}
                        </Header>
                        <ImdbIcon rating={movie.imdbRating}/>
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