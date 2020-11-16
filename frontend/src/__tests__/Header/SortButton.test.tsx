import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '../../reducers/store';
import SortButton from "../../Components/Header/SortButton";
import SortButtonContainer from "../../Components/Header/SortButtonContainer";

let counter = 0;

function mock() {
    counter++;
}

describe("Test to see if the sort button renders with our mock function, and passes props correctly", () => {
    test("Rendering of button", () => {
        const container = render(<Provider store={store}><SortButtonContainer number={'0'} mobile={false} refresh={mock}
                                                                     sort={"Name"}/></Provider>)
        const button = container.getByTestId("sortbutton0")
        expect(button).toBeInTheDocument();
    })

    test("Check if the refresh props gets passed the same amount of times to clicks", () => {
        const container = render(<Provider store={store}><SortButtonContainer mobile={false} number={"0"} refresh={mock}
                                                                     sort={"Name"}/></Provider>)
        const button = container.getByTestId("sortbutton0")
        fireEvent.click(button);
        expect(counter).toEqual(1);
        fireEvent.click(button);
        fireEvent.click(button);
        expect(counter).toEqual(3);
    })
})