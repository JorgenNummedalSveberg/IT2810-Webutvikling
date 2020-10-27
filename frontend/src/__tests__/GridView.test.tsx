import React from 'react';
import {render} from '@testing-library/react';
import GridView from '../Components/GridView'
import { Provider } from 'react-redux'
import {store} from '../reducers/store'

test("Snapshot test", ()=> {
    const gridview  = render(<Provider store={store}>(<GridView/></Provider>);
    expect(gridview).toMatchSnapshot();
})