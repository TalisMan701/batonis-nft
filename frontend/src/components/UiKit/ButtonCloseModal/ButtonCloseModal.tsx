import React, {CSSProperties, FC} from 'react';
import classes from './ButtonCloseModal.module.scss';
import {ReactComponent as CloseSVG} from '../../../assets/icons/close.svg';

interface IButtonCloseModalProps {
    onClick: () => void;
    style?: CSSProperties;
    className?: string;
}

const ButtonCloseModal: FC<IButtonCloseModalProps> = ({onClick, style, className}) => {
    const classNames = `${classes.btn} ${className}`
    return (
        <div onClick={onClick} className={classNames} style={{...style}}>
            <CloseSVG/>
        </div>
    );
};

export default ButtonCloseModal;