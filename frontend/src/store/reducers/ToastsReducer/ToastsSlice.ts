import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import React from 'react';
import {generateUEID} from '../../../utils/generateUEID';

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