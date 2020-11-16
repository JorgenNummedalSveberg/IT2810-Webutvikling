import {Movie} from "../../types/Movie";
import {useDispatch} from "react-redux";
import {setPopup, showPopup} from "../../actions";
import {ButtonBase, Divider, Grid, Paper} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import ImdbIcon from "../Shared/ImdbIcon";
import React from "react";


// Komponent for å vise frem en film i et kort
export default function MovieCard(props: {
    movie: Movie,
    classes: any,
    duration: string,
    handleClick: (movie: Movie) => void}) {
    return (
        <Grid className={props.classes().gridItem} item>
            <ButtonBase className={props.classes().paperButton} onClick={() => props.handleClick(props.movie)}>
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
                                <p className={props.classes().noMargin}>{props.duration}</p>
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

