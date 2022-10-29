import { useCallback } from "react";
import { useRef, useState, React } from "react";
import useBookSearch from "./useBookSearch"


const App = () => {
    const inputField = useRef(null)
    const [text, setText] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const handleSearch = (e) => {
        setText(e.target.value);
        setPageNumber(1)
    }

    const observer = useRef()

    const {books, error, loading, hasMore} = useBookSearch(text, pageNumber);

    const lastBookCallback = useCallback((node) => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPage => prevPage + 1)
            }
        })
        if(node) observer.current.observe(node);
    }, [loading, hasMore])

    return (
        <>
            <input type="text" 
                ref={inputField} 
                defaultValue={text} 
                onChange={e => handleSearch(e)}
            />
                
            {
                books.map((book, i) => {
                    if(i + 1 === books.length)
                        return <div ref={lastBookCallback} key={i}>{book}</div>
                    else return <div key={i}>{book}</div>
                })
            }
            <div>{loading ? "Loading..." : ""}</div>
            <div>{error ? "Error..." : ""}</div>
        </>
    )
}

export default App;