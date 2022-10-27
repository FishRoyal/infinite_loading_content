import { useEffect, useState } from "react";
import axios from "axios"

const UseBookSearch = (query, pageNumber) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState([]);
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        let cancel;
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: 'http://openlibrary.org/search.json',
            params: {
                q: query,
                page: pageNumber
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
        .then(({ data }) => {
            setBooks(prevBooks =>  
                [...new Set([...prevBooks, data.docs.map(b => b.title)])])

            setHasMore(data.docs.length > 0)
            setLoading(false)
        })
        .catch(e => {
            if(axios.isCancel(e)) return;
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber])

    return {
        loading,
        error,
        hasMore,
        books
    }
}

export default UseBookSearch;