import {Button, Drawer} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {sortBy} from "../../App";
import React from "react";
import FilterSortButton from "./FilterSortButton";
import TuneIcon from "@material-ui/icons/Tune";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SortButtonContainer from "../Header/SortButtonContainer";
import ControlPanelContainer from "../ControlPanel/ControlPanelContainer";

export default function FilterSort(props: {
    classes: { thin: string; filterButton: string; sorting: string; },
    refresh: () => void,
    openSorting: boolean,
    setSortingOpen: (b: boolean) => void,
    openFilter: boolean,
    setFilterOpen: (b: boolean) => void
}) {
    return (
        <div className={props.classes.thin}>
            <FilterSortButton action='Filter' class={props.classes.filterButton} setOpen={props.setFilterOpen}
                              icon={<TuneIcon/>}/>
            <FilterSortButton action='Sort' class={props.classes.filterButton} setOpen={props.setSortingOpen}
                              icon={<ExpandMoreIcon/>}/>
            <Drawer anchor={'top'} open={props.openSorting} onClose={() => props.setSortingOpen(false)}>
                <Button startIcon={<ArrowBackIcon/>} onClick={() => props.setSortingOpen(false)}>Close</Button>
                <div className={props.classes.sorting}>
                    {sortBy.map((sort, index) => (
                        <SortButtonContainer mobile={true} key={index} sort={sort} refresh={props.refresh}
                                             number={index.toString()}/>
                    ))}
                </div>
            </Drawer>
            <Drawer anchor={'left'} open={props.openFilter} onClose={() => props.setFilterOpen(false)}>
                <Button startIcon={<ArrowBackIcon/>} onClick={() => props.setFilterOpen(false)}>Close</Button>
                <ControlPanelContainer mobile={true} refresh={props.refresh}/>
            </Drawer>
        </div>
    )
}