import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {store} from '../reducers/store';
import SortingPanel from '../Components/SortingPanel'


test("render of sorting panel", () => {
    // @ts-ignore
    const {sortingPanel} = render(<Provider store={store}><SortingPanel refresh={}/></Provider>);

})