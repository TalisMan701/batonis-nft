import React, { createContext } from 'react';

interface IToastContext{
    show: (content: React.ReactNode)=>void
}

export const ToastContext = createContext<IToastContext>({show: () => null});
