import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux'
import {store} from '../../reducers/store'
import Header from "../../Components/Header/Header";
import userEvent from '@testing-library/user-event'

function mock() {
    return null;
}

describe("Header only testing searchbar, sortbuttons have its own file", () => {
    test("Check if searchbar renders, and typing works", () => {
        const container = render(<Provider store={store}><Header refresh={mock}/></Provider>)
        const as = container.getByTestId('searcher')
        expect(as).toBeInTheDocument()
        userEvent.type(as, "This is a test input")
        expect(as).toHaveValue("This is a test input")
    })
})

