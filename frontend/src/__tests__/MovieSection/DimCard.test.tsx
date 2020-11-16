import {render} from "@testing-library/react";
import React from "react";
import {mock} from "./MovieSection.test";
import DimCard from "../../Components/MovieSection/DimCard";


describe("A snapshot test for the ImdbIcon", () => {
    test("renders, and matches with snapshot", () => {
        const {container} = render(<DimCard classes={mock}/>);
        expect(container).toMatchSnapshot();
    })
})

