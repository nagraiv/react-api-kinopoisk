import React from 'react';
import Loader from "./UI/Loader.jsx";

const MovieDetails = ({details, isLoading, detailsError, children}) => {
    const cssClass = [
        'film'
    ];
    if (isLoading) {
        cssClass.push('loading');
    }

    return (
        <div className="container-right">
            {children}
            {detailsError &&
                <p className="not-found">При получении данных с сервера произошла ошибка {detailsError}</p>
            }
            {Object.values(details).length &&
                <div className={cssClass.join(' ')}>
                    {isLoading && <Loader/>}
                    <div className="film__title">{details.name}</div>

                    <div className="film__img">
                        <img src={details.poster} alt="Cover"/>
                    </div>

                    <div className="film__desc">
                        <p className="film__details">Год: {details.year}</p>
                        <p className="film__details">Рейтинг: {details.rating}</p>
                        <p className="film__details">Продолжительность: <span className="nowrap">{details.duration}</span></p>
                        <p className="film__details">Страна: {details.countries}</p>
                        <p className="film__details">Жанр: {details.genres}</p>
                        <p className="film__details">Возраст: {details.age}</p>
                    </div>
                    <p className="film_text">{details.description}</p>
                </div>
            }
        </div>
    );
};

export default MovieDetails;