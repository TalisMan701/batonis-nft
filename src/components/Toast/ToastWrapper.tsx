import React from 'react';
import classes from './ToastWrapper.module.scss';
import Toast from './Toast';
import ReactPortal from '../ReactPortal/ReactPortal';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {toastsSlice} from '../../store/reducers/ToastsReducer/ToastsSlice';

const ToastWrapper = () => {
    const {toasts} = useAppSelector(state => state.toasts)
    const dispatch = useAppDispatch();
    return (
        <ReactPortal wrapperId={'react-portal-toasts-container'}>
            <div className={classes.toastsWrapper}>
                {toasts.map((toast) => (
                    <Toast key={toast.id} close={() => dispatch(toastsSlice.actions.close(toast.id))}>
                        {toast.content}
                    </Toast>
                ))}
            </div>
        </ReactPortal>
    );
};

export default ToastWrapper;