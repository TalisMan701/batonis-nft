import React, {CSSProperties, FC} from 'react';
import classes from './ButtonCloseModal.module.scss';
import {ReactComponent as CloseSVG} from '../../../assets/icons/close.svg';

interface IButtonCloseModalProps {
    onClick: () => void
    style?: CSSProperties
}

const ButtonCloseModal: FC<IButtonCloseModalProps> = ({onClick, style}) => {
    return (
        <div onClick={onClick} className={classes.btn} style={{...style}}>
            <CloseSVG/>
        </div>
    );
};

export default ButtonCloseModal;