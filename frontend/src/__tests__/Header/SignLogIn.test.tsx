import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '../../reducers/store';
import SortButton from "../../Components/Header/SortButton";
import SignLogIn from "../../Components/Header/SignLogIn";
import {DimCard} from "../../Components/MovieSection/MovieCard";

describe("Test to see if the sort button renders with our mock function, and passes props correctly", () => {
    test("Rendering of button", () => {
        const {container} = render(<Provider store={store}><SignLogIn isLogged={false}/></Provider>);
        expect(container).toMatchSnapshot();
    })
})