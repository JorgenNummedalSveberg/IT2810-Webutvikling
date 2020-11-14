import {render} from "@testing-library/react";
import React from "react";
import ImdbIcon from "../../Components/Shared/ImdbIcon";

describe("A snapshot test for the ImdbIcon", () => {
    test("renders, and matches with snapshot", () => {
        const {container} = render(<ImdbIcon height={100} rating={10}/>);
        expect(container).toMatchSnapshot();
    })
})

