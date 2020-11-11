import {useDispatch, useSelector} from "react-redux";
import './CSS/ControlPanel.css';
import './CSS/ControlPanelMobile.css';
import {setGenre} from "../../actions";
import {MenuItem, Select} from "@material-ui/core";
import React from "react";
import {State} from "../../types/State";

// Endrer sjanger vi søker etter
function GenreSelector(props: { refresh: () => void }) {

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

    return (
        <Select
            style={{backgroundColor: 'pink'}}
            variant='outlined'
            color='secondary'
            value={genre.value}
            onChange={onSearchChange}
        >
            {genreOptions.map((genreOption, index) => <MenuItem key={index} value={genreOption.value}>{genreOption.text}</MenuItem>)}
        </Select>
    )
}

export default GenreSelector