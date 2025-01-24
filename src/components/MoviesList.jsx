import React from 'react';
import MovieCard from "./MovieCard.jsx";
import Loader from "./UI/Loader.jsx";

const MoviesList = ({movies, isLoading, openMovieDetails}) => {
    if (!movies.length && !isLoading) {
        return (
            <p className="not-found">Фильмы не найдены...</p>
        )
    }

    const cssClass = [
        'films'
    ];
    if (isLoading) {
        cssClass.push('loading');
    }

    return (
        <ul className={cssClass.join(' ')}>
            {isLoading && <Loader/>}
            {movies.map(movie => <MovieCard key={movie.id}
                                            id={movie.id}
                                            name={movie.name}
                                            year={movie.year}
                                            rating={movie.rating}
                                            poster={movie.poster}
                                            openMovieDetails={openMovieDetails}
            />)}
        </ul>
    );
};

export default MoviesList;