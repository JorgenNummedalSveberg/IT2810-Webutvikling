import {Button} from "@material-ui/core";
import React from "react";

export default function FilterSortButton(props: { class: string, setOpen: (b: boolean) => void, action: string, icon: JSX.Element }) {
    return (
        <Button
            data-testid={props.action+'Button'}
            className={props.class}
            startIcon={props.icon}
            onClick={() => props.setOpen(true)}
        >{props.action}
        </Button>
    )
}