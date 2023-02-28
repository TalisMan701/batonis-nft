import React, {useEffect, useId, useLayoutEffect, useRef, useState} from 'react';
import classes from './Cursor.module.scss';
import gsap from 'gsap';
import pawDog from '../../assets/icons/paw-dog.svg';
import {generateUEID} from '../../utils/generateUEID';

interface trackItem {
    x: number;
    y: number;
    rotate: number;
    id: string;
    direction: number;
}

const RAD2DEG = 180 / Math.PI;

const CursorTestGSAP = () => {
    const x = useRef(0);
    const y = useRef(0);
    const xC = useRef(0);
    const yC = useRef(0);
    const xT = useRef(0);
    const yT = useRef(0);
    const rotate = useRef(0);
    const pointer = useRef<HTMLDivElement>(null);
    const track = useRef<Array<trackItem>>([]);
    const [tracks, setTracks] = useState<Array<trackItem>>([]);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const speed = 0.05;
            gsap.set(pointer.current, {xPercent: -50, yPercent: -50});
            const xSet = gsap.quickTo(pointer.current, 'x', {duration: 0.001});
            const ySet = gsap.quickTo(pointer.current, 'y', {duration: 0.001});

            gsap.ticker.add(() => {
                const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

                xC.current += (x.current - xC.current) * dt;
                yC.current += (y.current - yC.current) * dt;
                xSet(x.current);
                ySet(y.current);

                const dx = x.current - xC.current;
                const dy = y.current - yC.current;

                const rotation = Math.atan2(dy, dx) + Math.PI / 2;
                rotate.current = rotation;
                if (pointer.current) {
                    gsap.set(pointer.current, {rotation: rotation + '_rad'});
                }
            });
        }, pointer);
        const mouseMoveHandler = (e: MouseEvent) => {
            const {clientX, clientY} = e;
            x.current = clientX;
            y.current = clientY;
            const xDifT = clientX - xT.current;
            const yDifT = clientY - yT.current;
            if (Math.abs(xDifT) > 24 || Math.abs(yDifT) > 24) {
                xT.current = clientX;
                yT.current = clientY;
                const step = 10;
                const tempArray = [...track.current];
                const dd =
                    tempArray.length > 0
                        ? tempArray.pop()?.direction == -1
                            ? step
                            : -step
                        : -step;
                const dx = (xDifT / 32) * dd;
                const dy = (-yDifT / 32) * dd;
                track.current.push({
                    x: clientX - xDifT / 2 + dy,
                    y: clientY - yDifT / 2 + dx,
                    rotate: rotate.current * RAD2DEG,
                    id: generateUEID() + Date.now(),
                    direction: dd / step,
                });
                if (track.current.length > 6) {
                    track.current = track.current.slice(track.current.length - 6);
                }
                setTracks([...track.current]);
            }
        };
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            ctx.revert();
            document.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, []);
    return (
        <>
            {/* style={{transform: `translate(${cursorXY.x}px, ${cursorXY.y}px)`}} */}
            <div ref={pointer} className={classes.pointer}>
                <img src={pawDog} alt='pointer-img' />
            </div>
            {tracks.map((item, index) => (
                <div
                    key={item.id}
                    className={classes.pointerSecond}
                    style={{top: item.y, left: item.x, transform: 'translate(-50%, -50%)'}}
                >
                    <img
                        src={pawDog}
                        alt='pointer-img'
                        style={{transform: `rotate(${item.rotate}deg)`}}
                    />
                </div>
            ))}
        </>
    );
};

export default CursorTestGSAP;
