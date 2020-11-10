import {Movie} from "../../types/Movie";
import {useDispatch} from "react-redux";
import {setPopup, showPopup} from "../../actions";
import {Dimmer, Icon, Loader} from "semantic-ui-react";
import {Card, CardContent, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import ImdbIcon from "../Shared/ImdbIcon";
import React from "react";

// Komponent for å vise frem en film i et kort
function MovieCard(props: { movie: Movie }) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Åpner opp Popup.
    function handleClick() {
        dispatch(setPopup(props.movie));
        dispatch(showPopup(true));
    }

    return (
        <Grid xs item>
            <Card style={{height: "100%", width: '100%', backgroundColor: '#464646'}} onClick={handleClick}>
                <CardMedia>
                    <img width={"100%"} src={props.movie.posterurl}/>
                </CardMedia>
                <CardHeader id={"id_" + (props.movie.title).replace(/\s/g, "")}
                             style={{color: 'white'}}>{props.movie.title}</CardHeader>
                <CardContent>
                    <div style={{color: '#e5dfca'}}>
                        <div> Genres: {props.movie.genres.join(", ")} </div>
                        <div id={"year_" + (props.movie.title).replace(/\s/g, "")}> Year: {props.movie.year} </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div style={{margin: '5px', display: 'flex', flexDirection: 'row'}}>
                        <div style={{color: '#e5dfca', margin: 'auto'}}>
                            <Icon size='large' name='hourglass'/>
                            {parseTime(props.movie.duration)}
                        </div>
                        <ImdbIcon rating={props.movie.imdbRating} height={35}/>
                    </div>
                </CardContent>
            </Card>
        </Grid>

    )
}

// Blanke kort for når nettsiden laster inn filmene
export function DimCard() {
    return (
        <Grid item>
            <Card className={"movieCard"} style={{backgroundColor: '#464646', overflow: 'hidden'}}>
                    <Loader size='massive'>Loading</Loader>
                <img src={'../../dimPoster.png'} />
            </Card>
        </Grid>
    )
}

// Tar inn tid i formatet på databasen og gjør det om til presentabel string, eller rein minuttverdi
function parseTime(time: number): string {
    let minutes = time;
    let hours = 0;
    while (minutes - 60 > 0) {
        minutes -= 60;
        hours++;
    }
    return hours + 'h' + minutes + 'm';
}

export default MovieCard