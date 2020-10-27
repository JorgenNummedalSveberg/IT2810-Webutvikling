import React from 'react';
import {getByTestId, render} from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux'
import {store} from '../reducers/store'

test("renders", () => {
    const { container } = render(<Provider store={store}>(<App /></Provider>);
    /*expect(container).toMatchSnapshot();*/
});
