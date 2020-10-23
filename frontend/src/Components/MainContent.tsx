import React from 'react';
import './CSS/MainContent.css';
import ControlPanel from "./ControlPanel";
import GridView from "./GridView";

function MainContent(props: {refresh: any}) {

    return (
      <div className="MainContent">
          <ControlPanel refresh={props.refresh}/>
          <GridView/>
      </div>
    );
  }
  export default MainContent;