import {setPage} from "../../actions";
import {Pagination} from "@material-ui/lab";
import React from "react";

export default function
    PagePicker(props: {
    dispatch: (f: { payload: any; type: string }) => void,
    page: number,
    pages: number,
    refresh: (number: number) => void
}) {
    return (
        <Pagination
            color={'primary'}
            size="large"
            onChange={(e: object, page: number) => {
                props.dispatch(setPage(page - 1));
                props.refresh(page - 1);
            }}
            page={props.page + 1}
            count={props.pages}/>
    )
}