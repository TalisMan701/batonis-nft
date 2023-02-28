import React, {CSSProperties, FC, useLayoutEffect, useRef} from 'react';
import classes from './Loader.module.scss';
import {ReactComponent as Vector1SVG} from '../../assets/img/Vector1.svg';
import {ReactComponent as Vector2SVG} from '../../assets/img/Vector2.svg';
import gsap from 'gsap';

interface LoaderProps{
    scale?: number,
    style?: CSSProperties,
    infinity?: boolean,
    playAnimation?: 'running' | 'paused',
    animation?: boolean,
    progress?: number | null
}

const Loader: FC<LoaderProps> = ({scale = 1, style, infinity = false, playAnimation = 'running', progress = null, animation = true}) => {
    const classNamesCircle = `${classes.circle} ${infinity ? classes.infinity : ''} ${animation ? '' : classes.animationNone}`
    const scope = useRef<HTMLDivElement>(null)
    const target = useRef<HTMLDivElement>(null)
    useLayoutEffect(()=>{
        if(playAnimation === 'paused'){
            const ctx = gsap.context(() => {
                gsap.to(target.current, {
                    scrollTrigger: {
                        trigger: target.current,
                        start: 'top 70%',
                        markers: false
                    },
                    animationPlayState: 'running'
                })
            }, scope)
            return () => {
                ctx.revert();
            };
        }
    },[])
    return (
        <div className={classes.content} style={{...style, transform: `scale(${scale})`}}>
            <div ref={scope} className={classes.vector1Wrapper}>
                <Vector1SVG/>
                <div style={{boxShadow: `inset 0px 0px 0px ${progress ? 230 - Math.floor((progress * 230)/100) : 230}px #FCEED6`}} ref={target} className={classNamesCircle} {...{playanimation: playAnimation}}/>
            </div>
            <Vector2SVG/>
        </div>
    );
};

export default Loader;