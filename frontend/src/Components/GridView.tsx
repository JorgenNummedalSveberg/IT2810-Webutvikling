import React from 'react';
import './CSS/GridView.css';
import {Grid, Pagination} from 'semantic-ui-react';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {setPage} from "../actions";
import Popup from './Popup';
import MovieCard, {DimCard} from "./MovieCard";


// Komponent som viser frem alle filmene i en responsiv grid
function GridView() {
    // Nødvendig for redux
    const dispatch = useDispatch();

    // Henter popup details fra state
    const showPopup = useSelector((state: state) => state.details.show);

    // Redux tate for å holde styr på hvilen side vi er på
    const page = useSelector((state: state) => state.page);

    // Henter filmene inn fra state (filtrerer utvalget basert på rating og årstall)
    const movies = useSelector((state: state) => state.movies
        .filter(movie =>
            movie.imdbRating >= state.filter.score[0] &&
            movie.imdbRating <= state.filter.score[1] &&
            parseInt(movie.year) >= state.filter.year[0] &&
            parseInt(movie.year) <= state.filter.year[1] && (!state.user || !!state.user && (!state.filter.myMovies || state.user.movies.includes(movie._id)))));


    const movieList: any[] = [];
    movies.forEach((movie, index) => {
        if (!movieList[Math.floor(index/20)]) {
            movieList[Math.floor(index/20)] = [];
        }
        movieList[Math.floor(index/20)].push(movie);
    })

    const dimList = () => {
        const list = [];
        for (let i = 0; i < 20; i++) {
            list.push(<DimCard key={i}/>);
        }
        return list;
    }

    // Lager en liste av alle MovieCards som skal med i Griden
    let movieCards: any[] = dimList();
    if (typeof movieList[page] !== "undefined") {
        movieCards = movieList[page].map((movie: any, index: number) => {
            return (
                <MovieCard movie={movie} key={index}/>
            )
        })
    }

    const pagination = (
        <Pagination
            boundaryRange={0}
            pointing
            secondary
            style={{margin: "20px"}}
            onPageChange={(e, {activePage}) => {
                dispatch(setPage((activePage as number)-1));
            }}
            activePage={page+1}
            totalPages={movieList.length} />
    )

    return (
        <div className={"GridView"}>
            {showPopup ?
                <Popup/> : null
            }
            {pagination}
            <Grid style={{margin: "20px", width: '100%'}} centered>
                {movieCards}
            </Grid>
            {pagination}
        </div>
    )
}


export default GridView;