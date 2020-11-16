import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from "react-redux";
import {store} from "../../reducers/store";
import GenreSelectorContainer from "../../Components/ControlPanel/GenreSelectorContainer";

function mock() {
}

describe("Test to see if the sort button renders with our mock function, and passes props correctly", () => {
    test("Rendering of button", () => {
        const {container} = render(<Provider store={store}><GenreSelectorContainer refresh={mock}/></Provider>);
        expect(container).toMatchSnapshot();
    })
})