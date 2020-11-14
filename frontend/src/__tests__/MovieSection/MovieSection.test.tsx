import React from 'react';
import {render} from '@testing-library/react';
import MovieSection from '../../Components/MovieSection/MovieSection'
import {Provider} from 'react-redux'
import {store} from '../../reducers/store'

test("Snapshot test", () => {
    const movieSection = render(<Provider store={store}>(<MovieSection/></Provider>);
    expect(movieSection).toMatchSnapshot();
})