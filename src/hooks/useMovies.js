import {useMemo} from "react";
import {setProperty} from "../utils/storage.js";

export const useSortedMovies = (movies, sort) => {
    const sortedMovies = useMemo(() => {
        if (sort) {
            return [...movies].sort((a, b) => {
                if (typeof a[sort] === 'string') return a[sort].localeCompare(b[sort]);
                else return b[sort] - a[sort];
            });
        }
        return movies;
    }, [sort, movies]);

    return sortedMovies;
}

export const useMovies = (movies, sort, query) => {
    const sortedMovies = useSortedMovies(movies, sort);

    const sortedAndSearchedMovies = useMemo(() => {
        return sortedMovies.filter(movie => movie.name.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedMovies]);

    setProperty('filter', {sort, query});
    return sortedAndSearchedMovies;
}



