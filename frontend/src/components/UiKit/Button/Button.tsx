import React, {CSSProperties, FC, MouseEventHandler} from 'react';
import classes from './Button.module.scss';

interface IButtonAsideProps {
    label?: string;
    style?: CSSProperties;
    size?: 'l' | 'm' | 's';
    onClick?: (e?: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
    color?: 'primary' | 'secondary';
    onMouseEnter?: (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
}

type IButtonAsidePropsWithIcon =
    | {icon: React.ReactNode; iconDirection: 'left' | 'right'}
    | {icon?: never; iconDirection?: never};

type IButtonAsidePropsWithType = {type?: 'button', href?: string, target?: string} | {type?: 'link', href: string, target: '_blank' | '_self' | '_parent' | '_top'}

type MainProps = IButtonAsideProps & IButtonAsidePropsWithIcon & IButtonAsidePropsWithType;

const Button: FC<MainProps> = ({label, style, icon, iconDirection, size = 'm', onClick, color = 'primary', onMouseEnter, onMouseLeave, href, type = 'button', target = '_self'}) => {
    const classNames = `${classes.btn} ${size === 'l' ? classes.btnL : ''} ${size === 's' ? classes.btnS : ''} ${color === 'secondary' ? classes.secondary : ''} ${!label && icon ? classes.onlyIcon : ''}`;

    const LinkOrButton: FC<{children: React.ReactNode, type: 'link' | 'button'}> = ({children, type}) => {
        if(type === 'button'){
            return (
                <div
                    className={classNames}
                    style={{...style}}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {children}
                </div>
            )
        }else{
            return (
                <a
                    draggable={false}
                    href={href}
                    target={target}
                    className={classNames}
                    style={{...style}}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {children}
                </a>
            )
        }
    }

    if (label) {
        return (
            <LinkOrButton
                type={type}
            >
                <>
                    {icon && iconDirection === 'left' && icon}
                    <span style={{marginLeft: iconDirection === 'left' ? 12 : 0, marginRight: iconDirection === 'right' ? 12 : 0}}>{label}</span>
                    {icon && iconDirection === 'right' && icon}
                </>
            </LinkOrButton>
        );
    }
    return (
        <LinkOrButton
            type={type}
        >
            {icon}
        </LinkOrButton>
    );
};

export default Button;
