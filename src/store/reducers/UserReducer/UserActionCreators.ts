import {AppDispatch} from '../../store';
import {userSlice} from './UserSlice';
import {checkChainId, checkWalletIsConnected, connectWallet, disconnectWallet} from '../../../api/web3';
import {toastsSlice} from '../ToastsReducer/ToastsSlice';

const {ethereum} = window;

export const _connectWallet = () => async (dispatch: AppDispatch) => {
    if(ethereum){
        const address = await connectWallet();
        if (address) {
            dispatch(userSlice.actions.setCurrentAccount(address));
        }
    }else{
        dispatch(toastsSlice.actions.show('Please install Metamask!'))
    }
}

export const _disconnectWallet = () => async (dispatch: AppDispatch) => {
    const disconnected = await disconnectWallet();

    if (disconnected) {
        dispatch(userSlice.actions.setCurrentAccount(''));
    }
}

export const _eventOnChangeWallet = () => async (dispatch: AppDispatch) => {
    if(ethereum){
        const res = await checkWalletIsConnected();

        ethereum.on('accountsChanged', (accounts: string[]) => {
            console.log('Account changed! Address: ', accounts[0]);
            dispatch(userSlice.actions.setCurrentAccount(accounts[0]));
        });

        dispatch(userSlice.actions.setCurrentAccount(res));
    }
}

export const _eventOnChangeChain = () => async (dispatch: AppDispatch) => {
    if (ethereum) {
        dispatch(userSlice.actions.setIsRightChainId(await checkChainId()));

        ethereum.on('chainChanged', async(chainId: string) => dispatch(userSlice.actions.setIsRightChainId(await checkChainId(chainId))));
    }
}