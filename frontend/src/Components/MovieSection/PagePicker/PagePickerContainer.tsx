import React from "react";
import PagePicker from "./PagePicker";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../types/State";

export default function PagePickerContainer(props: {refresh: (number: number) => void}) {

    const dispatch = useDispatch();
    const page = useSelector((state: State) => state.page);
    const pages = useSelector((state: State) => state.pages);
    return (
        <PagePicker refresh={props.refresh} dispatch={dispatch} page={page} pages={pages}/>
    )
}