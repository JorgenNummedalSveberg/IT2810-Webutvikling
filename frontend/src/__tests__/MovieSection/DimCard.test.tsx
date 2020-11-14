import {render} from "@testing-library/react";
import React from "react";
import {DimCard} from "../../Components/MovieSection/MovieCard";

describe("A snapshot test for the ImdbIcon", () => {
    test("renders, and matches with snapshot", () => {
        const {container} = render(<DimCard/>);
        expect(container).toMatchSnapshot();
    })
})

