import {Movie} from "../../types/Movie";
import {useDispatch} from "react-redux";
import {setPopup, showPopup} from "../../actions";
import {
    ButtonBase,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Grid,
    Paper,
    useMediaQuery
} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import ImdbIcon from "../Shared/ImdbIcon";
import React from "react";
import {makeStyles} from "@material-ui/styles";

// Komponent for å vise frem en film i et kort
function MovieCard(props: { movie: Movie }) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Åpner opp Popup.
    function handleClick() {
        dispatch(setPopup(props.movie));
        dispatch(showPopup(true));
    }

    const classes = makeStyles({
        card: {height: "100%", width: '100%', backgroundColor: '#464646'},
        gridItem: {flexGrow:1, flexBasis: 1, maxWidth: '600px', width: '600px'},
        paperButton: {height: "100%", width: '100%'},
        paper: {backgroundColor: '#E85A4F', height: "100%", width: '100%', display: 'flex', flexDirection: 'row'},
        poster: {maxWidth: '500px', minWidth: '250px'},
        details: {padding: '10px', display: 'flex', flexDirection: 'column'},
        title: {flexGrow: 1},
        description: {flexGrow: 4, color: 'white', textAlign: 'left'},
        bottomInfo: {
            margin: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            '& *': {margin: '5px'}
        },
        duration: {color: '#e5dfca', display: 'flex', alignItems: 'center'},
        noMargin: {
            margin: 0
        }
    })

    return (
        <Grid className={classes().gridItem} item>
            <ButtonBase className={classes().paperButton} onClick={handleClick}>
                <Paper className={classes().paper} elevation={5}>
                    <img className={classes().poster} alt='Could not display movie poster' width='100%' src={props.movie.posterurl}/>
                    <div className={classes().details}>
                        <div className={classes().title}>
                            <h1>{props.movie.title}</h1>
                            <Divider/>
                        </div>
                        <div className={classes().description}>
                            <h3>Year: {props.movie.year}</h3>
                            <h3>Genres: {props.movie.genres.join(', ')}</h3>
                        </div>
                        <div className={classes().bottomInfo}>
                            <div className={classes().duration}>
                                <HourglassFullIcon className={classes().noMargin} fontSize={"large"}/>
                                <p className={classes().noMargin}>{parseTime(props.movie.duration)}</p>
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
export function DimCard() {
    return (
        <Grid item>
            <Card style={{height: "100%", width: '100%', backgroundColor: '#464646'}}>
                <Skeleton style={{backgroundColor: '#222222'}} variant="rect" width={"100%"} height={300} />
                <Skeleton animation="wave" width={340} height={40} style={{ margin: 10 }} />
                <Skeleton animation="wave" width={340} height={40} style={{ margin: 10 }} />
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