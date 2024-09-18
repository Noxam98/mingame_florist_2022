import React, {useEffect, useState} from 'react';
import style from './cutter.module.css'
import {MobileView, BrowserView, isMobile} from "react-device-detect";

const Cutter = ({data, setCutterInfo}) => {
    const [timerVisible, setTimerVisible] = useState(false)
    useEffect(() => {
        if (!data.canCutting) {
            setTimerVisible(false)
        } else
            setTimerVisible(true)
    }, [data.canCutting])



    return (
        <div style={{
            position: "absolute",

        }}>
            <div style={{
                position: "absolute",
                zIndex: '100',
                left: `${data?.pos.x}px`,
                top: `${data?.pos.y}px`,
                width: `${isMobile ? '60vw' : '35vw'}`,
                overflow: 'hidden',
                transform: 'translate(-75%, -30%)',
                cursor: `${!data.isDragged ? 'grab' : 'none'}`
            }}>
                <img
                    draggable={false}
                    style={{width: '100%'}}
                    onTouchStart={() => {
                        setCutterInfo(prev => {
                            return {
                                ...prev,
                                isDragged: true
                            }
                        })
                    }}
                    onTouchEnd={() => {
                        setCutterInfo(prev => {
                            return {
                                ...prev,
                                isDragged: false
                            }
                        })
                    }}
                    onMouseDown={() => {
                        setCutterInfo(prev => {
                            return {
                                ...prev,
                                isDragged: true
                            }
                        })
                    }}
                    onMouseUp={() => {
                        setCutterInfo(prev => {
                            return {
                                ...prev,
                                isDragged: false
                            }
                        })
                    }}

                    src={!data?.isOpen ? 'src/assets/images/cutter-opened.png' : 'src/assets/images/cutter-closed.png'}/>


            </div>
            <div style={{opacity: '0', width: '0', height: '0'}}>
                <img style={{opacity: '0', width: '0', height: '0'}} src={'src/assets/images/cutter-closed.png'}/>
                <img style={{opacity: '0', width: '0', height: '0'}} src={'src/assets/images/cutter-opened.png'}/>
            </div>
            {!timerVisible &&
                <div
                    style={{
                        position: 'fixed',
                        bottom: `${isMobile? '7px' : '100px'}`,
                        left: '7px'
                }}
                    className={style.loader}></div>
            }
        </div>
    );
};

export default Cutter;
