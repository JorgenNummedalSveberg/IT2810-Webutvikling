import React from 'react';
import {act, render} from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux'
import {store} from '../reducers/store'
import {shallow} from "enzyme";
import Header from "../Components/Header";


test("render1", () => {
    const container = shallow(<Provider store={store}>(<App /></Provider>)
    console.log(container.getElement())
})
let counter = 0;
function mock() {
    counter++;
}
test("render", () => {
    const header = render(<Provider store={store}><Header refresh={mock}/></Provider>)
    const searchbar = header.getByTestId("searchbar")
    expect(searchbar).toBeInTheDocument();
})

test("renders", () => {
    const  app = render(<Provider store={store}>(<App /></Provider>);
    /*expect(container).toMatchSnapshot();*/
    const ts = app.getByTestId("searchbar")
    expect(ts).toBeInTheDocument()
});
