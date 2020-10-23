import React from 'react';
import './CSS/ControlPanel.css';
import {Dropdown} from 'semantic-ui-react';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {setGenre} from "../actions";

// Holder styr på parametere å endre søket etter
function ControlPanel(props: {refresh: any}) {
    return (
      <div className="ControlPanel">
          <GenreSelector refresh={props.refresh}/>
      </div>
    );
}

// Endrer sjanger vi søker etter
function GenreSelector(props: {refresh: any}) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Henter inn sjangre fra redux state
    const genres = useSelector((state: state) => state.genres);

    // Definerer options for dropdown meny
    const genreOptions = genres.map((genre, index) => {
        if (index === 0) {
            return {key: "", text: "Select genre...", value: ""}
        } else {
            return {key: genre, text: genre, value: genre};
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
        />
    )
}
export default ControlPanel;