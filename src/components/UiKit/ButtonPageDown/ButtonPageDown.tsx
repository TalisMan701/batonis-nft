import React, {CSSProperties, FC} from 'react';
import classes from './ButtonPageDown.module.scss'

interface IButtonPageDownProps {
    label?: string;
    style?: CSSProperties;
}

const ButtonPageDown: FC<IButtonPageDownProps> = ({label, style}) => {
    return (
        <div className={classes.btn} style={{...style}}>
            {label}
        </div>
    );
};

export default ButtonPageDown;