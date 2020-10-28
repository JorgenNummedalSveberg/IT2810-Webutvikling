import React from 'react';
import './CSS/ControlPanel.css';
import {Checkbox, Dropdown} from 'semantic-ui-react';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {myMovies, setGenre} from "../actions";
import RangeSlider from "./RangeSlider";
import {User} from "../types/user";


// Holder styr på parametere å endre søket etter
function ControlPanel(props: {refresh: ()=>void}) {

    const dispatch = useDispatch();
    // Henter inn score fra redux state
    const score = useSelector((state: state) => state.filter.score);
    // Henter årstall fra redux state
    const year = useSelector((state: state) => state.filter.year);
    const user = useSelector((state: state) => state.user);

    const req = (reqUser: User) => {
        return ({
            method: 'POST',
            body: JSON.stringify(reqUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function handleTick() {
        dispatch(myMovies())
    }

    return (
      <div className="ControlPanel">
          <GenreSelector refresh={props.refresh}/>
          <RangeSlider score={score} type="score"/>
          <RangeSlider score={year} type="year"/>
          {!!user ? <div className={"ControlElement Checkbox"}>
              <h2>My movies</h2>
              <Checkbox id={"checkboxMovie"} style={{margin: '10px'}} onChange={handleTick} toggle />
          </div> : <div/>}
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