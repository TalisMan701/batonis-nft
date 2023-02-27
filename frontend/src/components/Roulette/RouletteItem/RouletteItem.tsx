import React, {FC} from 'react';
import classes from './RouletteItem.module.scss';
import {INFTData} from '../../../models/INFTData';

interface RouletteItemProps {
    item: INFTData & {size: number, margin: number};
}

const RouletteItem: FC<RouletteItemProps> = ({item}) => {
    return (
        <div
            draggable={false}
            className={classes.item}
            style={{backgroundImage: `url(${item.img})`, minWidth: item.size, height: item.size, margin: `0 ${item.margin}px`}}
        >
            {/* <img className={classes.img} src={item.url} alt=""/>*/}
        </div>
    );
};

export default RouletteItem;
