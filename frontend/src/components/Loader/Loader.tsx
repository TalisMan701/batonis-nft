import React, {CSSProperties, FC} from 'react';
import classes from './Loader.module.scss';
import {ReactComponent as Vector1SVG} from '../../assets/img/Vector1.svg';
import {ReactComponent as Vector2SVG} from '../../assets/img/Vector2.svg';

interface LoaderProps{
    scale?: number,
    style?: CSSProperties
}

const Loader: FC<LoaderProps> = ({scale = 1, style}) => {
    return (
        <div className={classes.content} style={{...style, transform: `scale(${scale})`}}>
            <div className={classes.vector1Wrapper}>
                <Vector1SVG/>
                <div className={classes.circle}/>
            </div>
            <Vector2SVG/>
        </div>
    );
};

export default Loader;