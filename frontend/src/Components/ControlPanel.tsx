import React from 'react';
import './CSS/ControlPanel.css';
import {Dropdown} from 'semantic-ui-react';


function ControlPanel(props: {update: any, genres: any, movies: any}) {
    return (
      <div className="ControlPanel">
          <GenreSelector update={props.update} genres={props.genres}/>
      </div>
    );
  }

function GenreSelector(props: {genres: any, update: any}) {
    function onSearchChange(e: any, data: any) {
        props.update(data.value);
    }
    return (
        <Dropdown
            placeholder={"Select genre..."}
            className={"Dropdown"}
            fluid
            selection
            onChange={onSearchChange}
            options={props.genres}
        />
    )
}
export default ControlPanel;