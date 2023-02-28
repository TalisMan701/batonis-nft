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
    mintStage: string
    progressMinting: number | null
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
    mintStage: '',
    progressMinting: null
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
            state.mintStage = ''
        },
        setIHaveDrop(state, action: PayloadAction<boolean>){
          state.iHaveDrop = action.payload
        },
        clickLogo(state){
            state.goRoulette = false
            state.iHaveDrop = false
        },
        breakingMint(state){
            state.goRoulette = false
            state.iHaveDrop = false
            state.fetchMint = false
            state.fetchBuildRoulette = false
            state.myDrop = null
            state.mintStage = ''
            state.isLoading = true
            state.progressMinting = null
        },
        setFetchBuildRoulette(state, action: PayloadAction<boolean>){
            state.fetchBuildRoulette = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setFetchMint(state, action: PayloadAction<boolean>){
            state.fetchMint = action.payload
        },
        setMintStage(state, action: PayloadAction<{stage: string, progress: number}>){
            state.mintStage = action.payload.stage
            state.progressMinting = action.payload.progress
        },
        setProgressMinting(state, action: PayloadAction<number | null>){
            state.progressMinting = action.payload
        }
    }
})

export default userSlice.reducer;