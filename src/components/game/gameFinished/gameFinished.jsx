import React, {useEffect, useState} from 'react';
import styles from './finishScreen.module.css'
import finishPicture from '../../../assets/images/finish.svg'
import areYouContinue from '../../../assets/images/areYouContinue.svg'
import noILeft from '../../../assets/images/noILeft.svg'

const MissionCompleted = ({reward}) => {
    return (

        <div className={styles.missionComplete}>
            <img src={finishPicture}/>
            <span style={{marginTop:'-60px'}}>+{reward}$</span>
        </div>
    )
}

const AreYouContinue = ({SetGameIteration}) => {

    return (
        <div style={{position: "absolute", left: '50%', top: '50%', transform: 'translate(-50%, -20%)'}}
        className={styles.AreYouContinue}>
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center', position: 'relative'}}>
                <img src={areYouContinue} style={{scale: '.9'}}/>
                <button style={{
                    width: '200px',
                    border: "none",
                    marginTop: "10px",
                    fontSize:'12pt',
                    color: '#eeeeee',
                    cursor: "pointer",
                    height: '50px',
                    backgroundColor: '#FF5F856B',
                    borderRadius: '65.2732px',
                }}
                        onClick={()=>{SetGameIteration(prev => {
                            console.log(prev)
                            return ++prev
                        })}}
                >Продолжить
                </button>
                <img src={noILeft} style={{scale: '.5', paddingBottom: '50px', cursor: "pointer", }}/>
            </div>
        </div>
    )
}


const GameFinished = ({SetGameIteration}) => {
    const [NScreen, setNScreen] = useState(1)
    const reward = 100
    useEffect(()=>{
        setTimeout(()=>{
            setNScreen(2)
        }, 1500)
    }, [])

    return (
        <div className={styles.bg}>
            {
                NScreen === 1 &&
                <MissionCompleted reward={reward}/>
            }
            {
                NScreen === 2 &&
                <AreYouContinue SetGameIteration={SetGameIteration}/>
            }

        </div>
    );
};

export default GameFinished;