import React from 'react';

const MovieCard = ({id, name, year, rating, poster, openMovieDetails}) => {
    return (
        <li className="card" onClick={() => openMovieDetails(id)}>
            <img loading="lazy" width="200" height="300"
                 src={poster} alt="Cover"
                 className="card__img"/>
            <h3 className="card__title">{name}</h3>
            <p className="card__year">{year}</p>
            <p className="card__rate">Рейтинг: {rating}</p>
        </li>
    );
};

export default MovieCard;