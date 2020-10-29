import React from 'react';
import './CSS/MovieSection.css';
import {Grid, Message, Pagination} from 'semantic-ui-react';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../../types/state";
import {setPage} from "../../actions";
import Popup from './Popup';
import MovieCard, {DimCard} from "./MovieCard";


// Komponent som viser frem alle filmene i en responsiv grid
function MovieSection() {
    // Nødvendig for redux
    const dispatch = useDispatch();

    // Redux tate for å holde styr på hvilen side vi er på
    const page = useSelector((state: state) => state.page);

    // Definerer en side å vise i tilfellet ingen filmer blir hentet
    const errorPage = (
        <div className={"GridView"}>
            <Grid style={{margin: "20px", width: '100%'}} centered>
                <Message error>
                    <Message.Header>
                        No movies
                    </Message.Header>
                    <Message.Content>
                        This might be because:
                    </Message.Content>
                    <Message.List
                        items={['You may not be on the NTNU network or your VPN is off', "We do not have the movie you're looking for"]}/>
                    <Message.Content>
                        <a href={'https://www.youtube.com/watch?v=oHg5SJYRHA0'}>Maybe this can help</a>
                    </Message.Content>
                </Message>
            </Grid>
        </div>
    )

    // Sjekker først om det faktisk ble hentet filmer, og så filterer og displayer filmene
    return useSelector((state: state) => {
        if (state.movies.hasOwnProperty('error')) {
            return (errorPage);
        } else {
            // Filtrerer utvalget basert på rating og årstall
            const movies = state.movies
                .filter(movie =>
                    movie.imdbRating >= state.filter.score[0] &&
                    movie.imdbRating <= state.filter.score[1] &&
                    parseInt(movie.year) >= state.filter.year[0] &&
                    parseInt(movie.year) <= state.filter.year[1] && (!state.user || !!state.user && (!state.filter.myMovies || state.user.movies.includes(movie._id))));


            const movieList: any[] = [];
            movies.forEach((movie, index) => {
                if (!movieList[Math.floor(index / 20)]) {
                    movieList[Math.floor(index / 20)] = [];
                }
                movieList[Math.floor(index / 20)].push(movie);
            })

            // Lager en liste med sorte kort som placeholder mens filmene laster
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

            // Definerer sidevalg menyen
            const pagination = (
                <Pagination
                    boundaryRange={0}
                    pointing
                    secondary
                    style={{margin: "20px"}}
                    onPageChange={(e, {activePage}) => {
                        dispatch(setPage((activePage as number) - 1));
                    }}
                    activePage={page + 1}
                    totalPages={movieList.length}/>
            )

            return (
                <div className={"GridView"}>
                    {state.details.show ?
                        <Popup/> : null
                    }
                    {pagination}
                    <section>
                        <Grid style={{margin: "20px", width: '100%'}} centered>
                            {movieCards}
                        </Grid>
                    </section>

                    {pagination}
                </div>
            )
        }
    })
}

export default MovieSection;