import React from 'react';
import './CSS/MainContent.css';
import ControlPanel from "./ControlPanel";
import GridView from "./GridView";

function MainContent(props: {refresh: any, movies: any}) {

    return (
      <div className="MainContent">
          <ControlPanel refresh={props.refresh}/>
          <GridView movies={props.movies} />
      </div>
    );
  }
  export default MainContent;