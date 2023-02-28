import {AppDispatch} from '../../store';
import {userSlice} from './UserSlice';
import {
    approvePaymentToken, buyProcess,
    checkChainId,
    checkWalletIsConnected,
    connectWallet,
    disconnectWallet, getPaymentAllowance, getPrice, getTokenId, loadNFTImage
} from '../../../api/web3';
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

export const _mint = (currentAccount: string) => async (dispatch: AppDispatch) => {
    if(ethereum){
        dispatch(userSlice.actions.setFetchMint(true))
        dispatch(userSlice.actions.setMintStage({stage: 'Get price mint NFT', progress: 0}))
        const price = await getPrice()
        dispatch(userSlice.actions.setMintStage({stage: 'Get allowance token for contract', progress: 10}))
        const allowance = await getPaymentAllowance(currentAccount)
        const approveHandler = async () => {
            let tx: any;
            try {
                dispatch(userSlice.actions.setMintStage({stage: 'Approve token for contract', progress: 30}))
                tx = await approvePaymentToken(price)
            } catch (err: any){
                console.error(err.message);
            }
            try {
                await tx.wait()
                dispatch(userSlice.actions.setMintStage({stage: 'Get allowance token for contract', progress: 40}))
                return await getPaymentAllowance(currentAccount)
            } catch (err: any){
                console.error(err.message);
                return 0
            }
        }
        if(allowance < price){
            console.log('Approve');
            dispatch(userSlice.actions.setMintStage({stage: 'Approve token for contract', progress: 20}))
            const _allowance = await approveHandler()
            if(_allowance < price) {
                dispatch(toastsSlice.actions.show('Allowance < price mint. Please approve tokens'))
                dispatch(userSlice.actions.breakingMint())
                return
            }
        }
        console.log('Approve completed');
        try {
            console.log('Before minting');
            dispatch(userSlice.actions.setMintStage({stage: 'Minting NFT', progress: 50}))
            let tx = await buyProcess(currentAccount, price)
            console.log('Minting', tx.hash);
            dispatch(userSlice.actions.setMintStage({stage: 'Minting NFT', progress: 65}))
            tx = await tx.wait();
            let tokenId = -1;
            try {
                dispatch(userSlice.actions.setMintStage({stage: 'Get image', progress: 80}))
                tokenId = getTokenId(tx);
                const imageUrl = await loadNFTImage(tokenId);
                dispatch(userSlice.actions.setMintStage({stage: 'Get image', progress: 100}))
                dispatch(userSlice.actions.onRoulette({id: tokenId-1 || 1, img: imageUrl ?? '', cid: 'temp', rarity: 'common'}))
            } catch (err: any){
                dispatch(toastsSlice.actions.show('Failed to get image...'))
                console.error('Get token ID with tx', err)
                dispatch(userSlice.actions.setMintStage({stage: 'Get image', progress: 100}))
                dispatch(userSlice.actions.onRoulette({id: tokenId-1 || 1, img: '', cid: 'temp', rarity: 'common'}))
            }
        }catch (err: any){
            const error = (err.error && err.error.data && err.error.data.originalError) || err;
            const message = (error.message || err.message).replace('execution reverted: ', '');
            dispatch(toastsSlice.actions.show(message))
            console.error(`TX failed: ${ message }`);
            dispatch(userSlice.actions.breakingMint())
        }
    }
}