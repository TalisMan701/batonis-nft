import React, {FC} from 'react';
import classes from './RouletteItem.module.scss';
import {NFTData} from '../Roulette';

interface RouletteItemProps {
    item: NFTData & {size: number, margin: number};
}

const RouletteItem: FC<RouletteItemProps> = ({item}) => {
    return (
        <div
            className={classes.item}
            style={{backgroundImage: `url(${item.img})`, minWidth: item.size, height: item.size, margin: `0 ${item.margin}px`}}
        >
            {/* <img className={classes.img} src={item.url} alt=""/>*/}
        </div>
    );
};

export default RouletteItem;
