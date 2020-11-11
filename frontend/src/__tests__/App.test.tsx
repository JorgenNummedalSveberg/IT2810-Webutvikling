import {store} from "../reducers/store";
import {Provider} from "react-redux";
import App from "../App";
import {render} from "@testing-library/react";
import React from "react";

describe("A snapshot test for the whole App", () => {
    test("renders, and matches with snapshot", () => {
        const {container} = render(<Provider store={store}>(<App/></Provider>);
        expect(container).toMatchSnapshot();
    })
})

