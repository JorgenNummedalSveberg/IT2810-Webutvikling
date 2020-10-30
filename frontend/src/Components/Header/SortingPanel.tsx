import React from 'react';
import './CSS/SortingPanel.css';
import './CSS/BurgerMenu.css';
import SortButton from "./SortButton";
import {useMediaQuery} from "@material-ui/core";


// Panelet med sorteringskategorier
function SortingPanel(props: { refresh: any, show:boolean }) {
    // Ulike ting vi sorterer etter, komponenten returnerer en knapp for hvert element
    const sortBy = ["Name", "Rating", "Duration", "Year"];
    //Brukes for å bestemme hvilken meny som skal rendres.
    const mobile = useMediaQuery('(max-width: 900px)').valueOf();
    
    return (
        <div className={mobile ? "BurgerMenu":"SortingPanel"} style={{display:(props.show || !mobile) ? "initial":"none"}}>
            <div className="SortingPanel" id={"panelID"}>
                {sortBy.map((sort, index) => (
                    <SortButton key={index} sort={sort} refresh={props.refresh} nummer={index.toString()}/>
                ))}
            </div>
        </div>
    );
}

export default SortingPanel;