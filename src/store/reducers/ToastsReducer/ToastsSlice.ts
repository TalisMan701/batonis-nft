import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import React from 'react';

interface IToastItem {
    id: string | number
    content: React.ReactNode
}

interface ToastsState {
    toasts: IToastItem[]
}

const initialState: ToastsState = {
    toasts: []
}

// Create a random ID
function generateUEID() {
    let first: string | number = (Math.random() * 46656) | 0;
    let second: string | number = (Math.random() * 46656) | 0;
    first = ('000' + first.toString(36)).slice(-3);
    second = ('000' + second.toString(36)).slice(-3);

    return first + second;
}

export const toastsSlice = createSlice({
    name: 'toasts',
    initialState,
    reducers:{
        show(state, action: PayloadAction<React.ReactNode>){
            state.toasts.push({ id: generateUEID(), content: action.payload })
        },
        close(state, action: PayloadAction<string | number>){
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
        }
    }
})

export default toastsSlice.reducer;