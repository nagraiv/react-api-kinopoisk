import axios from "axios";

export default class MovieService {
    static URL = 'https://api.kinopoisk.dev/v1.4/movie';

    static headers = {
        'accept': 'application/json',
        'X-API-KEY': process.env.KINOPOISK_API_KEY || import.meta.env.VITE_API_KEY,
    }

    // забираем с сервера сразу максимальное количество записей (для корректной сортировки и фильтрации)
    // пагинация осуществляется без запроса к серверу
    // сейчас отобраны коллекции менее 250 фильмов, в дальнейшем можно сделать кнопку "Загрузить ещё"
    static async getCollection(collectionSlug = 'top250', limit = 250, page = 1) {
        const response = await axios.get(this.URL, {
            params: {
                lists: collectionSlug,
                limit: limit,
                page: page,
            },
            headers: this.headers,
        });
        if (response.data.total > response.data.limit) {
            console.warn('Размер коллекции превышает лимит выдачи сервера. Требуется доработка приложения!');
        }
        return response;
    }

    static async getById(id) {
        return await axios.get(this.URL + '/' + id, {
            headers: this.headers
        });
    }
}