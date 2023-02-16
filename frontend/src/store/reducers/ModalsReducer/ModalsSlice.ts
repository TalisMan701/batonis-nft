import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import React from 'react';

interface ModalsState {
    connectWalletModalIsOpen: boolean
    mintModalIsOpen: boolean
}

const initialState: ModalsState = {
    connectWalletModalIsOpen: false,
    mintModalIsOpen: false
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers:{
        setConnectWalletModalIsOpen(state, action: PayloadAction<boolean>){
            state.connectWalletModalIsOpen = action.payload
        },
        setMintModalIsOpen(state, action: PayloadAction<boolean>){
            state.mintModalIsOpen = action.payload
        }
    }
})

export default modalsSlice.reducer;