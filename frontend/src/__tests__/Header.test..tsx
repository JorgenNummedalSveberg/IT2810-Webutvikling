import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {store} from '../reducers/store';
import configureStore from 'redux-mock-store';
import refresh from '../App';
import filterReducer from '../reducers/filters'
import App from '../App';
import {filter} from '../types/filter'
import Header from '../Components/Header'

test("render of art", () => {
    // @ts-ignore
    const {header} = render(<Provider store={store}><Header refresh={}/></Provider>)

})