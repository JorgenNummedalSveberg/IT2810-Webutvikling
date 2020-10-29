import React from 'react';
import './CSS/BurgerMenu.css';
import SortButton from "./SortButton";

// Panelet med sorteringskategorier
function BurgerMenu(props: { refresh: any, show: boolean }) {
    // Ulike ting vi sorterer etter, komponenten returnerer en knapp for hvert element
    const sortBy = ["Name", "Rating", "Duration", "Year"];

    return (
        <div className="BurgerWrapper" style={{visibility: props.show ? "visible" : "hidden"}}>
            <div className="BurgerMenu" id={"panelID"}>
                {sortBy.map((sort, index) => (
                    <SortButton key={index} sort={sort} refresh={props.refresh} nummer={index.toString()+"burger"}/>
                ))}
            </div>
        </div>
    );
}

export default BurgerMenu;