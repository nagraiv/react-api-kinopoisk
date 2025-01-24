import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            // await new Promise(r => setTimeout(r, 5000));
            await callback(...args);
        } catch (e) {
            console.warn(e.message);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}