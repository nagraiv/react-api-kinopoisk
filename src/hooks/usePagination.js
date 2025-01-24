import {useEffect, useState} from "react";
import {getCurrentPageItems} from "../utils/pagination.js";
import {setProperty} from "../utils/storage.js";

export const usePagination = (items, page, limit) => {
    const [pagedItems, setPagedItems] = useState([]);

    useEffect(() => {
        setPagedItems(getCurrentPageItems(items, page, limit));
    }, [items, page, limit]);

    setProperty('pagination', {page, limit});
    return pagedItems;
}