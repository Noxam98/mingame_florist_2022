import React from 'react';
import styles from './background.module.css'
import mousePic from '../../assets/images/mouse-picture.svg'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const Background = () => {
    return (
        <>
            <div id="bgImg" className={styles.bgImg} draggable={false}/>
            <div id="bgBlack" className={styles.bgBlack} draggable={false}/>
            <div id="bgGrid" className={styles.bgGrid} draggable={false}/>
            <div className={styles.bgTitle} draggable={false}>
                <span className={styles.storageText} draggable={false}>ОБРЕЖЬТЕ</span>
                <span className={styles.fruitText} draggable={false}>ЛИСТЬЯ</span>
            </div>
            <BrowserView>
                <div className={styles.helper} draggable={false}>
                    <img src={mousePic} draggable={false}/>
                    <span draggable={false}>Используйте мышь, что бы управлять секатором</span>
                </div>
            </BrowserView>

        </>
    );
};

export default Background;