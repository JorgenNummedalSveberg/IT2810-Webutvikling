import React from 'react';
import './CSS/ControlPanel.css';
import {Dropdown} from 'semantic-ui-react';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {setGenre} from "../actions";
import RangeSlider from "./RangeSlider";


// Holder styr på parametere å endre søket etter
function ControlPanel(props: {refresh: ()=>void}) {
    // Henter inn score fra redux state
    const score = useSelector((state: state) => state.filter.score);
    // Henter årstall fra redux state
    const year = useSelector((state: state) => state.filter.year);

    const user = {
        userName:"jorgen", password: "123843", movies: []
    };
    const req = {
    method: 'POST',
        body: JSON.stringify(user),
        headers: {
        'Content-Type': 'application/json'
        }
    }

    function fetchpost() {
        fetch('http://localhost:5000/api/user/add', req)
            .then(() => console.log('User Created'))
            .catch(err => {
                console.error(err);
            });
    }
    
    return (
      <div className="ControlPanel" onClick={fetchpost}>
          <GenreSelector refresh={props.refresh}/>
          <RangeSlider score={score} type="score"/>
          <RangeSlider score={year} type="year"/>
      </div>
    );
}

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
export default ControlPanel;