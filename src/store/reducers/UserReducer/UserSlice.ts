import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
    currentAccount: string
    isRightChainId: boolean | null
}

const initialState: UserState = {
    currentAccount: '',
    isRightChainId: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setCurrentAccount(state, action: PayloadAction<string>){
            state.currentAccount = action.payload
        },
        setIsRightChainId(state, action: PayloadAction<boolean | null>){
            state.isRightChainId = action.payload
        }
    }
})

export default userSlice.reducer;