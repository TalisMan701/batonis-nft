import React, {CSSProperties, FC} from 'react';
import classes from './Link.module.scss';

interface LinkProps {
    mode: 'primary' | 'secondary',
    children?: React.ReactNode;
    href: string;
    style?: CSSProperties;
}

const Link: FC<LinkProps> = ({mode, children, href, style}) => {
    const classNames = `${classes.link} ${mode === 'primary' ? classes.primary : classes.secondary}`
    return (
        <a href={href} className={classNames} style={{...style}}>
            {children}
        </a>
    );
};

export default Link;