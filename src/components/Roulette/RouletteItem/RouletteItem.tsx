import React, {FC} from 'react';
import classes from './RouletteItem.module.scss';

interface RouletteItemProps {
    item: {id: number; url: string; size: number};
}

const RouletteItem: FC<RouletteItemProps> = ({item}) => {
    return (
        <div
            className={classes.item}
            style={{backgroundImage: `url(${item.url})`, minWidth: item.size, height: item.size}}
        >
            {/* <img className={classes.img} src={item.url} alt=""/>*/}
        </div>
    );
};

export default RouletteItem;
