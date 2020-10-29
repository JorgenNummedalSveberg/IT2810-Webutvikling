import React from 'react';
import {render} from '@testing-library/react';
import MovieSection from '../Components/GridView/MovieSection'
import {Provider} from 'react-redux'
import {store} from '../reducers/store'

test("Snapshot test", () => {
    const gridview = render(<Provider store={store}>(<MovieSection/></Provider>);
    expect(gridview).toMatchSnapshot();
})