import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INFTData} from '../../../models/INFTData';
import {getFromLocalStorage} from '../../../utils/localstorage';

interface UserState {
    currentAccount: string
    isRightChainId: boolean | null
    isLoading: boolean
    fetchBuildRoulette: boolean
    goRoulette: boolean
    iHaveDrop: boolean
    myDrop: INFTData | null
    fetchMint: boolean
    ethPrice: number
    priceMint: number
    allowance: number
    balance: number
    mintedCount: number
    maxSupply: number
}

const initialState: UserState = {
    currentAccount: '',
    isRightChainId: null,
    isLoading: true,
    fetchBuildRoulette: false,
    goRoulette: false,
    iHaveDrop: false,
    myDrop: null,
    fetchMint: false,
    ethPrice: +getFromLocalStorage('ethPrice', 3200),
    priceMint: +getFromLocalStorage('priceMint', 1e16),
    allowance: 0,
    balance: 0,
    mintedCount: 0,
    maxSupply: +getFromLocalStorage('maxSupply', 20)
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
        },
        setGoRoulette(state, action: PayloadAction<boolean>){
            state.goRoulette = action.payload
        },
        onRoulette(state, action: PayloadAction<INFTData>){
            state.fetchMint = false
            state.myDrop = action.payload
        },
        setIHaveDrop(state, action: PayloadAction<boolean>){
          state.iHaveDrop = action.payload
        },
        clickLogo(state){
            state.goRoulette = false
            state.iHaveDrop = false
        },
        setFetchBuildRoulette(state, action: PayloadAction<boolean>){
            state.fetchBuildRoulette = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setFetchMint(state, action: PayloadAction<boolean>){
            state.fetchMint = action.payload
        }
    }
})

export default userSlice.reducer;