import React, {FC, RefObject} from 'react';
import classes from './CarouselMobile.module.scss';
import Marquee from 'react-fast-marquee';

interface IItem {
    id: number;
    url: string;
}

interface CarouselMobileProps {
    items: IItem[];
    direction?: 'left' | 'right';
    itemSize?: number;
}

const CarouselMobile: FC<CarouselMobileProps> = ({items, direction = 'left', itemSize = 400}) => {
    return (
        <Marquee className={classes.container} gradient={false} direction={direction} speed={100}>
            {items.map((item) => (
                <img
                    draggable={false}
                    style={{width: itemSize, height: itemSize}}
                    className={classes.img}
                    src={item.url}
                    key={item.id}
                    alt={`item${item.id}`}
                />
            ))}
        </Marquee>
    );
};

export default CarouselMobile;
