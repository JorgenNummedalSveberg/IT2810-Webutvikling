import {render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../../reducers/store";
import {setPopup} from "../../actions";
import {testMovie} from "./MovieCard.test";
import PopupContainer from "../../Components/MovieSection/PopupContainer";
import {mock} from "./MovieSection.test";

describe("A snapshot test for the ImdbIcon", () => {
    test("renders, and matches with snapshot", () => {
        store.dispatch(setPopup(testMovie))
        const {container} = render(<Provider store={store}><PopupContainer refresh={mock}/></Provider>);
        expect(container).toMatchSnapshot();
    })
})

