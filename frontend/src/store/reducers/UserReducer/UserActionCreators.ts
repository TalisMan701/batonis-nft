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
        dispatch(userSlice.actions.setMintStage('Get price mint NFT'))
        const price = await getPrice()
        dispatch(userSlice.actions.setMintStage('Get allowance token for contract'))
        const allowance = await getPaymentAllowance(currentAccount)
        const approveHandler = async () => {
            let tx: any;
            try {
                dispatch(userSlice.actions.setMintStage('Approve token for contract'))
                tx = await approvePaymentToken(price)
            } catch (err: any){
                console.error(err.message);
            }
            try {
                await tx.wait()
                dispatch(userSlice.actions.setMintStage('Get allowance token for contract'))
                return await getPaymentAllowance(currentAccount)
            } catch (err: any){
                console.error(err.message);
                return 0
            }
        }
        if(allowance < price){
            console.log('Approve');
            const _allowance = await approveHandler()
            if(_allowance < price) {
                dispatch(userSlice.actions.breakingMint())
                return
            }
        }
        console.log('Approve completed');
        try {
            console.log('Before minting');
            dispatch(userSlice.actions.setMintStage('Minting NFT'))
            let tx = await buyProcess(currentAccount, price)
            console.log('Minting', tx.hash);
            tx = await tx.wait();
            try {
                dispatch(userSlice.actions.setMintStage('Get image'))
                const tokenId = getTokenId(tx);
                // todo починить функцию loadNFTImage ( там _ipfsToUrl получается baseURI Без слеша в конце, т.е. норм ссылку закинуть в baseURI. И в принципе залить в ipfs хранилище картинки и нормик будет)
                // const imageUrl = await loadNFTImage(tokenId);
                dispatch(userSlice.actions.onRoulette({id: tokenId ?? 1, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', cid: 'temp', rarity: 'common'}))
            } catch (err: any){
                console.error('Get token ID with tx', err)
                // todo показать заглушка по типу с вопросительным знаком потому что не удалось получить картинку
            }
        }catch (err: any){
            const error = (err.error && err.error.data && err.error.data.originalError) || err;
            const message = (error.message || err.message).replace('execution reverted: ', '');

            console.error(`TX failed: ${ message }`);
            dispatch(userSlice.actions.breakingMint())
        }
    }
}