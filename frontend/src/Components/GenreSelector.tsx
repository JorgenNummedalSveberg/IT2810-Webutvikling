import {useDispatch, useSelector} from "react-redux";
import {setGenre} from "../actions";
import {Dropdown} from "semantic-ui-react";
import React from "react";
import {state} from "../types/state";

// Endrer sjanger vi søker etter
function GenreSelector(props: {refresh: ()=>void}) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Henter inn sjangre fra redux state
    const genres = useSelector((state: state) => state.genres);

    // Definerer options for dropdown meny
    const genreOptions = genres.map((genre, index) => {
        if (index === 0) {
            return {key: "", text: "Select genre...", value: ""}
        } else {
            return {key: genre, text: genre, value: genre, id: genre};
        }
    });

    // Opdaterer state når du endrer sjanger
    function onSearchChange(e: any, data: any) {
        dispatch(setGenre(data.value));
        props.refresh();
    }
    return (
        <Dropdown
            placeholder={"Select genre..."}
            className={"Dropdown"}
            fluid
            selection
            onChange={onSearchChange}
            options={genreOptions}
            id={"dropdownmenu"}
        />
    )
}
export default GenreSelector