import {useDispatch, useSelector} from "react-redux";
import {setGenre} from "../../actions";
import {useTheme} from "@material-ui/core";
import React from "react";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";
import GenreSelector from "./GenreSelector";

// Endrer sjanger vi søker etter
export default function GenreSelectorContainer(props: { refresh: () => void }) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Henter inn sjangre fra redux state
    const genres = useSelector((state: State) => state.genres);

    // Henter inn sjangre fra redux state
    const genreText = useSelector((state: State) => state.filter.genre);
    const genre = {text: genreText, value: genreText};

    // Definerer options for dropdown meny
    const genreOptions = genres.map((genre, index) => {
        return {key: genre, text: genre, value: genre, id: genre};
    });

    // Opdaterer state når du endrer sjanger
    function onSearchChange(e: any, data: any) {
        dispatch(setGenre(data.props.value));
        props.refresh();
    }

    const theme = useTheme();
    const classes = makeStyles({
        selector: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main)
        }
    })

    return (
        <GenreSelector
            classes={classes()}
            genre={genre}
            genreOptions={genreOptions}
            onSearchChange={onSearchChange}
            refresh={props.refresh}/>
    )
}

