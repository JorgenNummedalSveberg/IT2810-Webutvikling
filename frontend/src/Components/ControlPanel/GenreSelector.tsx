import {useDispatch, useSelector} from "react-redux";
import {setGenre} from "../../actions";
import {MenuItem, Select, useTheme} from "@material-ui/core";
import React from "react";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";

// Endrer sjanger vi søker etter
function GenreSelector(props: {
    onSearchChange: (e: any, data: any) => void,
    genreOptions: {text: string, value: string}[],
    genre: {text: string, value: string}, classes: any, refresh: () => void }) {
    return (
        <Select
            className={props.classes.selector}
            variant={'outlined'}
            value={props.genre.value}
            defaultValue={props.genreOptions.length > 0 ? props.genre : ''}
            onChange={props.onSearchChange}
            autoWidth={true}
            data-testid='genreSelector'
        >
            {props.genreOptions.map((genreOption, index) => <MenuItem key={index}
                                                                value={genreOption.value}>{genreOption.text}</MenuItem>)}
        </Select>
    )
}

export default GenreSelector