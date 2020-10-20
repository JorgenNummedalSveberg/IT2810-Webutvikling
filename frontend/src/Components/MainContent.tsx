import React from 'react';
import './CSS/MainContent.css';
import ControlPanel from "./ControlPanel";
import GridView from "./GridView";

function MainContent() {

    return (
      <div className="MainContent">
          <ControlPanel/>
          <GridView/>
      </div>
    );
  }
  export default MainContent;