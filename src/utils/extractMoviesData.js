export const extractMoviesData = (data) => {
    return data.docs.map(el => ({
        id: el.id,
        name: el.name,
        year: el.year,
        rating: el.rating?.kp,
        poster: el.poster?.url,
    }));
}

export const extractMoviesDetails = (data) => {
    return {
        id: data.id,
        name: data.name,
        year: data.year,
        description: data.description,
        duration: formatMovieLength(data.movieLength),
        rating: data.rating?.kp,
        poster: data.poster?.url,
        age: data.ageRating,
        countries: data.countries.map(county => county.name).join(', '),
        genres: data.genres.map(genre => genre.name).join(', '),
    };
}

function formatMovieLength (timeInMinutes) {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes - hours * 60;
    return `${hours} ч. ${minutes} мин.`;
}