import {Movie} from "../../types/Movie";
import {useDispatch} from "react-redux";
import {setPopup, showPopup} from "../../actions";
import {ButtonBase, Divider, Grid, Paper, useTheme} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import ImdbIcon from "../Shared/ImdbIcon";
import React from "react";
import {makeStyles} from "@material-ui/styles";



// Komponent for å vise frem en film i et kort
function MovieCard(props: { movie: Movie, classes: any }) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Åpner opp Popup.
    function handleClick() {
        dispatch(setPopup(props.movie));
        dispatch(showPopup(true));
    }


    return (
        <Grid className={props.classes().gridItem} item>
            <ButtonBase className={props.classes().paperButton} onClick={handleClick}>
                <Paper className={props.classes().paper} elevation={5}>
                    <img className={props.classes().poster} alt='Could not display movie poster' width='100%'
                         src={props.movie.posterurl}/>
                    <div className={props.classes().details}>
                        <div className={props.classes().title}>
                            <h1>{props.movie.title}</h1>
                            <Divider/>
                        </div>
                        <div className={props.classes().description}>
                            <h3>Year: {props.movie.year}</h3>
                            <h3>Genres: {props.movie.genres.join(', ')}</h3>
                        </div>
                        <div className={props.classes().bottomInfo}>
                            <div className={props.classes().duration}>
                                <HourglassFullIcon className={props.classes().noMargin} fontSize={"large"}/>
                                <p className={props.classes().noMargin}>{parseTime(props.movie.duration)}</p>
                            </div>
                            <Divider orientation='vertical'/>
                            <ImdbIcon rating={props.movie.imdbRating} height={35}/>
                        </div>
                    </div>
                </Paper>
            </ButtonBase>
        </Grid>

    )
}

// Blanke kort for når nettsiden laster inn filmene
export function DimCard(props: {classes: any}) {
    return (
        <Grid className={props.classes().gridItem} item>
            <Paper className={props.classes().paper}>
                <Skeleton animation="pulse" variant="rect" width={300} height={450}/>
                <div className={props.classes().details}>
                    <Skeleton animation="wave" width={180} height={40} style={{margin: 10}}/>
                    <Skeleton animation="wave" width={200} height={2} style={{margin: 10}}/>
                    <Skeleton animation="wave" width={170} height={40} style={{margin: 10}}/>
                    <Skeleton animation="wave" width={130} height={40} style={{margin: 10}}/>
                </div>
            </Paper>
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