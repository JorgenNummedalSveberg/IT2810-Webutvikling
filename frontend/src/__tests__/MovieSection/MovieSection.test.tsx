import React from 'react';
import {render} from '@testing-library/react';
import MovieSectionContainer from '../../Components/MovieSection/MovieSectionContainer'
import {Provider} from 'react-redux'
import {store} from '../../reducers/store'
import {makeStyles} from "@material-ui/styles";


// Fake styles to trick components
export function mock() {
    const classes = makeStyles(
        {
            card: {}, gridItem: {}, paperButton: {}, paper: {}, poster: {}, details: {},
            title: {}, description: {}, bottomInfo: {}, duration: {}, noMargin: {}
        }
    )
    return classes
}

test("Snapshot test", () => {
    const movieSection = render(<Provider store={store}>(<MovieSectionContainer error={false}
                                                                                refresh={mock}/></Provider>);
    expect(movieSection).toMatchSnapshot();
})