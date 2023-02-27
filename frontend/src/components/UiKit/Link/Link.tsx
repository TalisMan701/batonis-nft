import React, {CSSProperties, FC} from 'react';
import classes from './Link.module.scss';

interface LinkProps {
    mode: 'primary' | 'secondary',
    children?: React.ReactNode;
    href: string;
    style?: CSSProperties;
    onClick?: ()=>void;
    className?: string;
    disable?: boolean;
}

const Link: FC<LinkProps> = ({mode, children, href, style, onClick, className, disable = false}) => {
    const classNames = `${classes.link} ${mode === 'primary' ? classes.primary : classes.secondary} ${className} ${disable ? classes.disable : ''}`
    return (
        <a draggable={false} href={href} className={classNames} style={{...style}} onClick={()=>{
            if(!disable && onClick){
                onClick()
            }
        }}>
            {children}
        </a>
    );
};

export default Link;