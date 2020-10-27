import React from 'react';
import {render} from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux'
import {store} from '../reducers/store'

describe("A snapshot test for the whole App", ()=> {
    test("renders, and matches with snapshot", () => {
        const { container } = render(<Provider store={store}>(<App /></Provider>);
        expect(container).toMatchSnapshot();
    })
})

