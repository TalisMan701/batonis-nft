import React, {FC, RefObject, useLayoutEffect, useRef} from 'react';
import classes from './Carousel.module.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

interface IItem {
    id: number,
    url: string
}

interface ICarouselProps {
    items: IItem[],
    direction?: 'left' | 'right',
    scope: RefObject<HTMLDivElement>
}

const Carousel: FC<ICarouselProps> = ({items, direction= 'left', scope}) => {
    const target = useRef<HTMLDivElement>(null)
    useLayoutEffect(()=>{
        let startX = 0
        if(target.current){
            startX = direction === 'left' ? 120 : -(4288 - window.innerWidth) - 120
        }
        const ctx = gsap.context(()=>{
            gsap.set(target.current,{
                x: startX
            })
            gsap.to(target.current, {
                scrollTrigger: {
                    trigger: scope.current,
                    scrub: 0.5,
                },
                x: () => direction === 'left' ? startX - 500 : startX + 500
            })
        }, target)
        return () => {
            ctx.revert()
        }
    },[])

    return (
        <div className={classes.container} ref={target}>
            {items.map(item => (
                <img className={classes.img} src={item.url} key={item.id} alt={`item${item.id}`}/>
            ))}
        </div>
    );
};

export default Carousel;