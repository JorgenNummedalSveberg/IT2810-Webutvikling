import {Movie} from "../../types/Movie";
import {useDispatch} from "react-redux";
import {setPopup, showPopup} from "../../actions";
import {Card, Dimmer, Grid, Icon, Image, Loader} from "semantic-ui-react";
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
        <Grid.Column stretched tablet={5} mobile={8} computer={3}>
            <Card style={{backgroundColor: '#464646'}} onClick={handleClick}>
                <Image src={props.movie.posterurl} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header id={"id_" + (props.movie.title).replace(/\s/g, "")}
                                 style={{color: 'white'}}>{props.movie.title}</Card.Header>
                    <Card.Description style={{color: '#e5dfca'}}>
                        <div role={"showGenre"}> Genres: {props.movie.genres.join(", ")} </div>
                        <div id={"year_" + (props.movie.title).replace(/\s/g, "")}> Year: {props.movie.year} </div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Grid centered style={{margin: '5px'}}>
                        <div style={{color: '#e5dfca', margin: 'auto'}}>
                            <Icon size='large' name='hourglass'/>
                            {parseTime(props.movie.duration)}
                        </div>
                        <ImdbIcon rating={props.movie.imdbRating} height={35}/>
                    </Grid>
                </Card.Content>
            </Card>
        </Grid.Column>

    )
}

// Blanke kort for når nettsiden laster inn filmene
export function DimCard() {
    return (
        <Grid.Column stretched tablet={5} mobile={8} computer={3}>
            <Card className={"movieCard"} style={{backgroundColor: '#464646', overflow: 'hidden', zIndex: "8"}}>
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Image src={'../../dimPoster.png'} wrapped ui={false}/>
            </Card>
        </Grid.Column>
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