import React, {FC, useMemo, useState} from 'react';
import { ToastContext } from './ToastContext';
import classes from './ToastProvider.module.scss';
import ReactPortal from '../../ReactPortal/ReactPortal';
import Toast from './Toast';

interface IToastItem {
    id: string | number
    content: React.ReactNode
}

// Create a random ID
function generateUEID() {
    let first: string | number = (Math.random() * 46656) | 0;
    let second: string | number = (Math.random() * 46656) | 0;
    first = ('000' + first.toString(36)).slice(-3);
    second = ('000' + second.toString(36)).slice(-3);

    return first + second;
}

interface IToastProviderProps {
    children: React.ReactNode
}

export const ToastProvider: FC<IToastProviderProps> = ({children}) => {
    const [toasts, setToasts] = useState<IToastItem[]>([]);

    const show = (content: React.ReactNode) =>
        setToasts((currentToasts) => [
            ...currentToasts,
            { id: generateUEID(), content },
        ]);

    const close = (id: number | string) =>
        setToasts((currentToasts) =>
            currentToasts.filter((toast) => toast.id !== id)
        );

    const contextValue = useMemo(() => ({ show }), []);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}

            <ReactPortal wrapperId={'react-portal-toasts-container'}>
                <div className={classes.toastsWrapper}>
                    {toasts.map((toast) => (
                        <Toast key={toast.id} close={() => close(toast.id)}>
                            {toast.content}
                        </Toast>
                    ))}
                </div>
            </ReactPortal>
        </ToastContext.Provider>
    );
};