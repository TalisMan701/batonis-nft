import React, {FC} from 'react';
import classes from './Toast.module.scss';
import ButtonCloseModal from '../ButtonCloseModal/ButtonCloseModal';
import {useTimeout} from '../../../hooks/useTimeout';

interface IToastProps {
    close: () => void,
    children: React.ReactNode
}

const Toast: FC<IToastProps> = ({close, children}) => {
    useTimeout(close, 5000);
    return (
        <div className={classes.toast}>
            <div className={classes.toastContentWrapper}>{children}</div>
            <ButtonCloseModal onClick={close} style={{position: 'absolute', top: 0, left: -36}}/>
        </div>
    );
};

export default Toast;