import React from 'react';
import './CSS/ControlPanel.css';
import {Dropdown} from 'semantic-ui-react';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {setGenre} from "../actions";


function ControlPanel(props: {refresh: any}) {
    return (
      <div className="ControlPanel">
          <GenreSelector refresh={props.refresh}/>
      </div>
    );
  }

function GenreSelector(props: {refresh: any}) {
    const dispatch = useDispatch();
    const genres = useSelector((state: state) => state.genres);
    const genreOptions = genres.map((genre, index) => {
        if (index === 0) {
            return {key: "", text: "Select genre...", value: ""}
        } else {
            return {key: genre, text: genre, value: genre};
        }
    });
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