import React, {useEffect, useRef, useState} from 'react';
import _ from 'lodash'
import styles from './branch.module.css'
import {isMobile, BrowserView, MobileView} from "react-device-detect";


const Flower = ({cutterInfo, number, setCutterInfo, mouseInfo, setFlowersList, x, y, branchInfo}) => {
    const [classname, setClassName] = useState(styles.flowerStatic)
    const [position, setPosition] = useState({x: null, y: null, size: null})
    const [isLoaded, setIsLoaded] = useState(false)

    const flowRef = useRef()
    useEffect(() => {

        setPosition({
            x: flowRef.current.offsetLeft,
            y: flowRef.current.offsetTop,
            size: flowRef.current.offsetWidth
        })

    }, [isLoaded])

    useEffect(() => {
        if (cutterInfo.pos.x > position.x   && cutterInfo.pos.x < position.x + position.size &&
            cutterInfo.pos.y > position.y   && cutterInfo.pos.y < position.y + position.size && cutterInfo.canCutting) {
            console.log(number)
            if (mouseInfo.mouseDown) {

                setPosition({x: -100, y: -100, size: 1})
                setCutterInfo(prev => {
                    return {...prev, isOpen: true, canCutting: false}
                })
                setClassName(styles.flowerDrop)

                setTimeout(() => {
                    setCutterInfo(prev => {
                        return {...prev, canCutting: true}
                    })
                }, 800)

                setTimeout(() => {
                    setFlowersList(prev => {
                        return prev.filter(flow => flow.number !== number)
                    })
                }, 2000)
                setTimeout(() => {
                    setCutterInfo(prev => {
                        return {...prev, isOpen: false}
                    })
                }, 200)

            } else
                setClassName(prev => {
                    return prev + ` ${styles.flowerEnter}`

                })
        } else {
            setClassName(prev => {
                return prev.replace(styles.flowerEnter, '')
            })
        }


    }, [cutterInfo])
    return (
        <>
            <BrowserView>

                <img src={'src/assets/images/flower.png'}
                     ref={flowRef}
                     className={classname}
                     draggable={false}
                     style={
                         {
                             zIndex: '100', position: "absolute",
                             width: '7vw',
                             left: `${branchInfo.left + (branchInfo.width / 100 * x)}px`,
                             top: `${branchInfo.top + (branchInfo.height / 100 * y)}px`,
                             cursor:'none'
                         }
                     }
                     onLoad={() => setIsLoaded(true)}
                />

            </BrowserView>
            <MobileView>
                <img src={'src/assets/images/flower.png'}
                     ref={flowRef}
                     className={classname}
                     style={
                         {
                             zIndex: '100', position: "absolute",
                             width: '12vw',
                             left: `${branchInfo.left + (branchInfo.width / 100 * x)}px`,
                             top: `${branchInfo.top + (branchInfo.height / 100 * y)}px`
                         }
                     }
                     onLoad={() => setIsLoaded(true)}
                />
            </MobileView>
        </>
    )
}

const Branch = ({cutterInfo, mouseInfo, setCutterInfo, flowersList, setFlowersList, gameIteration}) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false)
    const [branchInfo, setBranchInfo] = useState(false)

    const imgRef = useRef()
    useEffect(() => {
        if (imageIsLoaded) {

            const branchInfo = {
                top: imgRef.current.offsetTop,
                left: imgRef.current.offsetLeft,
                height: imgRef.current.offsetHeight,
                width: imgRef.current.offsetWidth
            }
            console.log(branchInfo)
            setBranchInfo(branchInfo)
        }
    }, [imageIsLoaded])


    useEffect(() => {
        const countOfFlowers = _.random(3, 5)
        const shuffleArr = isMobile ?
            _.shuffle([[10, 25], [30, 10], [48, 13], [65, 14], [60, 58]])
            :
            _.shuffle([[10, 25], [30, 10], [48, 13], [65, 14], [75, 13], [77, 35], [68, 47], [60, 58]])

        const randomPointList = shuffleArr.slice(0, countOfFlowers)


        for (let point of randomPointList) {
            setFlowersList((prev) => {
                return [...prev, {
                    pos: {
                        x: point[0],
                        y: point[1]
                    },
                    number: point[0] + '' + point[1]
                }]
            })
        }

    }, [gameIteration])

    return (
        <>
            <BrowserView>
                <img ref={imgRef}
                     src={'src/assets/images/branch.png'}
                     draggable={false}
                     style={{
                         position: 'absolute',
                         zIndex: '10',
                         top: '35%',
                         right: '0',
                         width: '70%',
                         // transform: 'translateY(-40%)',
                         // backgroundColor: 'red'
                     }}
                     onLoad={() => {
                         setImageIsLoaded(true)
                     }}


                />
            </BrowserView>
            <MobileView>
                <img ref={imgRef}
                     src={'src/assets/images/branch.png'}
                     draggable={false}
                     style={{
                         position: 'absolute',
                         zIndex: '10',
                         top: '35%',
                         right: '0',
                         width: '100%',
                         overflow: 'hidden'

                     }}
                     onLoad={() => {
                         setImageIsLoaded(true)
                     }}


                />
            </MobileView>

            {
                imageIsLoaded && flowersList.length &&
                flowersList.map((flower => <Flower setCutterInfo={setCutterInfo} mouseInfo={mouseInfo}
                                                   cutterInfo={cutterInfo} setFlowersList={setFlowersList}
                                                   key={flower.number} branchInfo={branchInfo} x={flower.pos.x}
                                                   y={flower.pos.y}
                                                   number={flower.number}/>))
            }
        </>
    );
};

export default Branch;