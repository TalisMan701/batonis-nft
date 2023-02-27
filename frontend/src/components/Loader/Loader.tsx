import React, {CSSProperties, FC, useLayoutEffect, useRef} from 'react';
import classes from './Loader.module.scss';
import {ReactComponent as Vector1SVG} from '../../assets/img/Vector1.svg';
import {ReactComponent as Vector2SVG} from '../../assets/img/Vector2.svg';
import gsap from 'gsap';

interface LoaderProps{
    scale?: number,
    style?: CSSProperties,
    infinity?: boolean,
    playAnimation?: 'running' | 'paused'
}

const Loader: FC<LoaderProps> = ({scale = 1, style, infinity = false, playAnimation = 'running'}) => {
    const classNamesCircle = `${classes.circle} ${infinity ? classes.infinity : ''}`
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
                <div ref={target} className={classNamesCircle} {...{playanimation: playAnimation}}/>
            </div>
            <Vector2SVG/>
        </div>
    );
};

export default Loader;