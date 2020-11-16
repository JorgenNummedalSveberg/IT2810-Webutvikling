import {render} from "@testing-library/react";
import React from "react";
import MovieCard from "../../Components/MovieSection/MovieCard";
import {Provider} from "react-redux";
import {store} from "../../reducers/store";
import {Movie} from "../../types/Movie";
import {mock} from "./MovieSection.test";

export const testMovie = {
    "_id": "5f8d940bf270ea3f3486577a",
    "id": "1",
    "title": "Black Panther",
    "year": "2018",
    "genres": ["Action", "Adventure", "Sci-Fi"],
    "ratings": [4, 1, 9, 6, 2, 10, 6, 5, 1, 7, 4, 5, 6, 5, 6, 3, 10, 10, 8, 2, 5, 3, 4, 6, 6, 7, 9, 4, 4, 9],
    "poster": "MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg",
    "contentRating": "15",
    "duration": 134,
    "releaseDate": "2018-02-14",
    "averageRating": 0,
    "originalTitle": "",
    "storyline": "After the events of Captain America: Civil War, King T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war.                Written by\nEditor",
    "actors": ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
    "imdbRating": 7,
    "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg",
    "visits": 272,
    "watches": 136
} as Movie


describe("A snapshot test for the ImdbIcon", () => {
    test("renders, and matches with snapshot", () => {

        const {container} = render(<Provider store={store}><MovieCard classes={mock} movie={testMovie}/></Provider>);
        expect(container).toMatchSnapshot();
    })
})

