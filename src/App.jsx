import React, {useEffect, useState} from 'react'
import MoviesList from "./components/MoviesList.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import MySelect from "./components/UI/MySelect.jsx";
import MyRadioGroup from "./components/UI/MyRadioGroup.jsx";
import Filter from "./components/UI/Filter.jsx";
import Reset from "./components/UI/Reset.jsx";
import Pagination from "./components/UI/Pagination.jsx";
import MovieService from "./API/MovieService.js";
import collections from './data/moviesCollections.json';
import {useMovies} from "./hooks/useMovies.js";
import {useFetching} from "./hooks/useFetching.js";
import {usePagination} from "./hooks/usePagination.js";
import {extractMoviesData, extractMoviesDetails} from "./utils/extractMoviesData.js";
import {getPageCount} from "./utils/pagination.js";
import {restoreProperty, setProperty} from "./utils/storage.js";

export default function App() {
    const [isDetailsOpened, setDetailsOpenedState] = useState(restoreProperty('isDetailsOpened'));
    const [movieDetails, setMovieDetails] = useState(restoreProperty('movieDetails'));
    const [fetchMovieDetails, isMovieDetailsLoading, detailsError] = useFetching(async (movieId) => {
        const response = await MovieService.getById(movieId);
        console.log(response);

        const details = extractMoviesDetails(response.data);
        setMovieDetails(details);
        setProperty('movieDetails', details);

        setDetailsOpenedState(true);
        setProperty('isDetailsOpened', true);
    });

    const [movies, setMovies] = useState([]);
    const [moviesCollection, setMoviesCollection] = useState(restoreProperty('moviesCollection'));
    const [fetchMovies, isMoviesLoading, movieError] = useFetching(async () => {
        const response = await MovieService.getCollection(moviesCollection);
        console.log(response.data.docs);
        setMovies(extractMoviesData(response.data));
    });
    useEffect(() => {
        fetchMovies(moviesCollection);
        setProperty('moviesCollection', moviesCollection);
    }, [moviesCollection]);

    const [filter, setFilter] = useState(restoreProperty('filter'));
    const sortedAndSearchedMovies = useMovies(movies, filter.sort, filter.query);

    const [paginParams, setPaginParams] = useState(restoreProperty('pagination'));
    useEffect(() => {
        setPaginParams({
            ...paginParams,
            totalPages: getPageCount(sortedAndSearchedMovies.length, paginParams.limit),
            page: 1,
        });
    }, [sortedAndSearchedMovies, paginParams.limit]);
    const pagedMovies = usePagination(sortedAndSearchedMovies, paginParams.page, paginParams.limit);

    return (
        <>
            <div className="container-left">
                <h1 className="page-title">Лучшие фильмы по версии портала <span className="accent">Кинопоиск</span></h1>
                <MyRadioGroup
                    options={collections}
                    value={moviesCollection}
                    onChange={e => setMoviesCollection(e.target.value)}
                    groupName={'movies-collection'}
                />
                <Filter
                    filter={filter}
                    setFilter={setFilter}
                >
                    <MySelect
                        value={paginParams.limit}
                        onChange={limit => setPaginParams({...paginParams, limit})}
                        label="Фильмов на странице"
                        options={[
                            {value: 6, name: '6'},
                            {value: 12, name: '12'},
                            {value: 24, name: '24'},
                            {value: -1, name: 'Все'},
                        ]}
                    />
                </Filter>
                {movieError &&
                    <p className="not-found">При получении данных с сервера произошла ошибка</p>
                }
                <MoviesList
                    movies={pagedMovies}
                    isLoading={isMoviesLoading}
                    openMovieDetails={id => fetchMovieDetails(id)}
                />
                {
                    paginParams.totalPages > 1 ?
                        <Pagination
                            page={paginParams.page}
                            changePage={page => setPaginParams({...paginParams, page})}
                            totalPages={paginParams.totalPages}
                        />
                        :
                        null
                }
            </div>
            {isDetailsOpened &&
                <MovieDetails
                    details={movieDetails}
                    isLoading={isMovieDetailsLoading}
                    detailsError={detailsError}
                >
                    <Reset
                        className={'reset btn-close'}
                        onClick={() => {
                            setDetailsOpenedState(false);
                            setProperty('isDetailsOpened', false);
                        }}
                    />
                </MovieDetails>}
        </>
    )
}
