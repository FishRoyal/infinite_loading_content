import { useRef, useState, React} from "react";
import useBookSearch from "./useBookSearch"


const App = () => {
    const inputField = useRef(null)
    const [text, setText] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const handleSearch = (e) => {
        setText(e.target.value);
        setPageNumber(1)
    }

    const {books, error, loading, hasMore} = useBookSearch(text, pageNumber)
    return (
        <>
            <input type="text" 
                ref={inputField} 
                defaultValue={text} 
                onChange={e => handleSearch(e)}
            />
                
            {
                books.map((book, i) => {
                    return <div key={i}>{book}</div>
                })
            }
            <div>{loading ? "Loading..." : ""}</div>
            <div>{error ? "Error..." : ""}</div>
        </>
    )
}

export default App;