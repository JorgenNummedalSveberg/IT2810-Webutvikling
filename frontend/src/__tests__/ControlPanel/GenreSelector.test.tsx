import React from 'react';
import {render} from '@testing-library/react';
import GenreSelector from "../../Components/ControlPanel/GenreSelector";
import {Provider} from "react-redux";
import {store} from "../../reducers/store";

function mock() {
}

describe("Test to see if the sort button renders with our mock function, and passes props correctly", () => {
    test("Rendering of button", () => {
        const {container} = render(<Provider store={store}><GenreSelector refresh={mock}/></Provider>);
        expect(container).toMatchSnapshot();
    })
})