import React, {useEffect, useRef, useState} from 'react';
import classes from './Cursor.module.scss';

interface trackItem {
    x: number;
    y: number;
    rotate: number;
    id: number;
    direction: number;
}

const RAD2DEG = 180 / Math.PI;

const Cursor = () => {
    const delay = 18;
    const x = useRef(0);
    const y = useRef(0);
    const xT = useRef(0);
    const yT = useRef(0);
    const rotate = useRef(0);
    const [cursorProps, setCursorProps] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    });
    const pointer = useRef<HTMLDivElement>(null);
    const track = useRef<Array<trackItem>>([]);
    useEffect(() => {
        const mouseMoveHandler = (event: MouseEvent) => {
            const {clientX, clientY} = event;
            const xDif = clientX - x.current;
            const yDif = clientY - y.current;
            const xDifT = clientX - xT.current;
            const yDifT = clientY - yT.current;
            if (Math.abs(xDif) > 3 || Math.abs(yDif) > 3) {
                x.current = clientX;
                y.current = clientY;
                rotate.current = Math.atan2(yDif, xDif) * RAD2DEG + 90;
            }
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
                    rotate: rotate.current,
                    id: Date.now(),
                    direction: dd / step,
                });
                if (track.current.length > 4) {
                    track.current.shift();
                }
            }
            setCursorProps({x: clientX, y: clientY});
        };
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, []);
    return (
        <>
            {/* style={{transform: `translate(${cursorXY.x}px, ${cursorXY.y}px)`}} */}
            <div
                ref={pointer}
                className={classes.pointer}
                style={{
                    top: cursorProps.y,
                    left: cursorProps.x,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <img
                    src='https://cdn-icons-png.flaticon.com/512/3/3734.png'
                    alt='pointer-img'
                    style={{transform: `rotate(${rotate.current}deg)`}}
                />
            </div>
            {track.current.map((item, index) => (
                <div
                    key={item.id}
                    className={classes.pointerSecond}
                    style={{top: item.y, left: item.x, transform: 'translate(-50%, -50%)'}}
                >
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/3/3734.png'
                        alt='pointer-img'
                        style={{transform: `rotate(${item.rotate}deg)`}}
                    />
                </div>
            ))}
        </>
    );
};

export default Cursor;
