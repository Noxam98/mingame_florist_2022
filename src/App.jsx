import Background from "./components/background/background.jsx";
import {useEffect, useState} from "react";
import Game from "./components/game/game.jsx";


function App() {
    const [mouseInfo, setMouseInfo] = useState({
        pos: {x: window.innerWidth / 2, y: window.innerHeight / 2},
        mouseDown: false
    })

    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            setMouseInfo((prev) => {
                return {
                    ...prev,
                    pos: {
                        x: e.clientX,
                        y: e.clientY
                    }
                }
            })
        })
        document.addEventListener('touchmove', (e) => {
            setMouseInfo((prev) => {
                return {
                    ...prev,
                    pos: {
                        x: e.changedTouches[0].clientX,
                        y: e.changedTouches[0].clientY-70
                    }
                }
            })
        })

        document.addEventListener('mousedown', (e) => {
            setMouseInfo((prev) => {
                return {
                    ...prev, mouseDown: true
                }
            })

        })
        document.addEventListener('mouseup', (e) => {
            setMouseInfo((prev) => {
                return {
                    ...prev, mouseDown: false
                }
            })

        })
        document.addEventListener('touchstart', (e) => {
            setMouseInfo((prev) => {
                return {
                    ...prev, mouseDown: true
                }
            })
        })
        document.addEventListener('touchend', (e) => {
            setMouseInfo((prev) => {
                return {
                    ...prev, mouseDown: false
                }
            })
        })
    }, [])


    return (
        <div className="App">
            <Background/>
            <Game mouse={mouseInfo} setMouseInfo={setMouseInfo}/>
        </div>
    )
}

export default App
