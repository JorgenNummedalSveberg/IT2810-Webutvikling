import React from 'react';
import {render} from '@testing-library/react';
import RangeSlider from "../../Components/ControlPanel/RangeSlider";
import {Provider} from "react-redux";
import {store} from "../../reducers/store";

describe("Test to see if the sort button renders with our mock function, and passes props correctly", () => {
    test("Rendering of button", () => {
        const {container} = render(<Provider store={store}><RangeSlider score={[10, 100]} type={"year"}/></Provider>);
        expect(container).toMatchSnapshot();
    })
})