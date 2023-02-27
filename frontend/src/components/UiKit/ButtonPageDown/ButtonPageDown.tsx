import React, {CSSProperties, FC} from 'react';
import classes from './ButtonPageDown.module.scss'

interface IButtonPageDownProps {
    label?: string;
    style?: CSSProperties;
}

const ButtonPageDown: FC<IButtonPageDownProps> = ({label, style}) => {
    return (
        <a draggable={false} href={'#collection'} className={classes.btn} style={{...style}}>
            {label}
        </a>
    );
};

export default ButtonPageDown;