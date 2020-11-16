import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from "react-redux";
import {store} from "../../reducers/store";
import RangeSliderContainer from "../../Components/ControlPanel/RangeSliderContainer";
import {mock} from "../MovieSection/MovieSection.test";

describe("Test to see if the sort button renders with our mock function, and passes props correctly", () => {
    test("Rendering of button", () => {
        const {container} = render(<Provider store={store}><RangeSliderContainer refresh={mock} score={[10, 100]}
                                                                                 type={"year"}/></Provider>);
        expect(container).toMatchSnapshot();
    })
})