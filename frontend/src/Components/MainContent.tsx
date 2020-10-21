import React from 'react';
import './CSS/MainContent.css';
import ControlPanel from "./ControlPanel";
import GridView from "./GridView";

function MainContent(props: {update: any, genres: any, movies: any}) {

    return (
      <div className="MainContent">
          <ControlPanel update={props.update} genres={props.genres} movies={props.movies} />
          <GridView movies={props.movies} />
      </div>
    );
  }
  export default MainContent;