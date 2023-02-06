import React, {CSSProperties, FC} from 'react';
import classes from './Button.module.scss';

interface IButtonAsideProps {
    label?: string;
    style?: CSSProperties;
    size?: 'l' | 'm';
    onClick?: () => void;
    color?: 'primary' | 'secondary';
}

type IButtonAsidePropsWithIcon =
    | {icon: React.ReactNode; iconDirection: 'left' | 'right'}
    | {icon?: never; iconDirection?: never};

type MainProps = IButtonAsideProps & IButtonAsidePropsWithIcon;

const Button: FC<MainProps> = ({label, style, icon, iconDirection, size = 'm', onClick, color = 'primary'}) => {
    const classNames = `${classes.btn} ${size === 'l' ? classes.btnL : ''} ${color === 'secondary' ? classes.secondary : ''} ${!label && icon ? classes.onlyIcon : ''}`;

    if (label) {
        return (
            <div className={classNames} style={{...style}} onClick={onClick}>
                <>
                    {icon && iconDirection === 'left' && icon}
                    <span style={{marginLeft: iconDirection === 'left' ? 12 : 0, marginRight: iconDirection === 'right' ? 12 : 0}}>{label}</span>
                    {icon && iconDirection === 'right' && icon}
                </>
            </div>
        );
    }
    return (
        <div className={classNames} style={{...style}}>
            {icon}
        </div>
    );
};

export default Button;
