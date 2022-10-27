import { useEffect, useRef, useState} from "react";

const App = () => {
    const inputField = useRef(null)
    const [text, setText] = useState('default')

    useEffect(() => {
        console.log(text)
    }, [text])

    return (
        <input type="text" ref={inputField} defaultValue={text} onChange={(e) => setText(e.target.value)}/>

    )
}

export default App;