import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '../../reducers/store';
import SignLogInContainer from "../../Components/Header/SignLogInContainer";
import {mock} from "../MovieSection/MovieSection.test";

describe("Test to see if the sort button renders with our mock function, and passes props correctly", () => {
    test("Rendering of button", () => {
        const {container} = render(<Provider store={store}><SignLogInContainer refresh={mock}
                                                                               isLogged={false}/></Provider>);
        expect(container).toMatchSnapshot();
    })
})