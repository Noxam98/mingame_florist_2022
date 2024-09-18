import React, {useEffect, useState} from 'react';
import Branch from "./branch/branch.jsx";
import Cutter from "./cutter/cutter.jsx";
import GameFinished from "./gameFinished/gameFinished.jsx";

const Game = ({mouse, setMouseInfo}) => {
    const [flowersList, setFlowersList] = useState([])
    const [gameIteration, setGameIteration] = useState(0)

    const [cutterInfo, setCutterInfo] = useState({
        pos: {x: window.innerWidth / 2, y: 500},
        isOpen: false, isDragged: false, canCutting: true
    })

    useEffect(()=>{
        setCutterInfo({
            pos: {x: window.innerWidth / 2, y: 500},
            isOpen: false, isDragged: false, canCutting: true
        })
    }, [gameIteration])

    useEffect(() => {
        if (cutterInfo.isDragged)
        setCutterInfo(prevState => {
            return {
                ...prevState,
                pos: mouse.pos
            }
        })
    }, [mouse])

    useEffect(()=>{
        setCutterInfo(prev => {
            return {...prev, pos: {x: window.innerWidth/2, y: 400 }}
        })
        setMouseInfo(prev => {
            return {...prev, pos: {x: window.innerWidth/2, y: 400 }}
        })
    }, [])



    return (
        <div>
            {
                flowersList.length &&
                <Cutter setCutterInfo={setCutterInfo} data={cutterInfo}/>
            }

            <Branch gameIteration={gameIteration} mouseInfo={mouse} setCutterInfo={setCutterInfo} flowersList={flowersList} setFlowersList={setFlowersList}  cutterInfo={cutterInfo}/>
            {
                flowersList.length === 0&&
                <GameFinished SetGameIteration={setGameIteration}/>
            }
        </div>
    );
};

export default Game;