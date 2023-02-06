import React, {CSSProperties, FC} from 'react';
import classes from './Logo.module.scss';

interface LogoProps {
    label: string,
    style?: CSSProperties;
}

const Logo: FC<LogoProps> = ({label, style}) => {
    return (
        <div className={classes.logo} style={{...style}}>
            {label}
        </div>
    );
};

export default Logo;