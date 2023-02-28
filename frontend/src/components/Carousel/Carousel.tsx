import React, {FC, RefObject, useLayoutEffect, useRef} from 'react';
import classes from './Carousel.module.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {useMatchMedia} from '../../hooks/useMatchMedia';

gsap.registerPlugin(ScrollTrigger)

interface IItem {
    id: number,
    url: string,
}

interface ICarouselProps {
    items: IItem[],
    direction?: 'left' | 'right',
    scope: RefObject<HTMLDivElement>,
    itemSize?: number
}

const Carousel: FC<ICarouselProps> = ({items, direction= 'left', scope, itemSize = 400}) => {
    const target = useRef<HTMLDivElement>(null)
    const {isMobile} = useMatchMedia()
    useLayoutEffect(()=>{
        let startX = 0
        if(target.current){
            startX = direction === 'left' ? 120 : -(items.length*(itemSize+32)- 32 - window.innerWidth) - 120
        }
        const ctx = gsap.context(()=>{
            gsap.set(target.current,{
                x: startX
            })
            gsap.to(target.current, {
                scrollTrigger: {
                    trigger: target.current,
                    scrub: 2,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    markers: false
                },
                x: () => direction === 'left' ? startX - (items.length*itemSize)/1.35 : startX + (items.length*itemSize)/1.35
            })
        }, target)
        return () => {
            ctx.revert()
        }
    },[])

    return (
        <div className={classes.container} ref={target}>
            {items.map(item => (
                <img draggable={false} style={{width: itemSize, height: itemSize}} className={classes.img} src={item.url} key={item.id} alt={`item${item.id}`}/>
            ))}
        </div>
    );
};

export default Carousel;