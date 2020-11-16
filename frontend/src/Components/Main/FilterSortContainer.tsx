import React, {useState} from "react";
import FilterSortButton from './FilterSortButton';
import {makeStyles} from "@material-ui/styles";
import {useMediaQuery} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterSort from "./FilterSort";

export default function FilterSortContainer(props: {refresh: () => void}) {

    const classes = makeStyles({
        filterButton: {
            fontSize: '2em',
            backgroundColor: 'rgb(200, 200, 200, 0.5)',
            padding: '0 20px 0 20px',
            margin: '20px 10px 20px 10px'
        },
        thin: {
            display: useMediaQuery('(max-width: 1400px)').valueOf() ? 'flex' : 'none',
            justifyContent: 'center',
            textAlign: 'center'
        },
        sorting: {
            backgroundColor: '#40798C',
            display: 'flex',
            justifyContent: 'center',
            height: '200px',
            padding: '40px',
            '& *': {
                margin: '10px',
                fontSize: '1.3em'
            }
        },
    })

    const [openSorting, setSortingOpen] = useState(false)
    const [openFilter, setFilterOpen] = useState(false)

    return (
        <div className={classes().thin}>
            <FilterSortButton action='Filter' class={classes().filterButton} setOpen={setFilterOpen} icon={<TuneIcon/>}/>
            <FilterSortButton action='Sort' class={classes().filterButton} setOpen={setSortingOpen} icon={<ExpandMoreIcon/>}/>
            <FilterSort refresh={props.refresh} openFilter={openFilter} openSorting={openSorting} setFilterOpen={setFilterOpen} setSortingOpen={setSortingOpen} sorting={classes().sorting}/>
        </div>
    )
}