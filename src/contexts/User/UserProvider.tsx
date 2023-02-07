import React, {FC, useEffect, useMemo, useState} from 'react';
import {UserContext} from './UserContext';
import {
    changeChainId,
    checkChainId,
    checkWalletIsConnected,
    connectWallet,
    disconnectWallet,
    worknet
} from '../../api/web3';
import {useToast} from '../../components/UiKit/Toast';

interface IUserProviderProps{
    children: React.ReactNode
}

const UserProvider: FC<IUserProviderProps> = ({children}) => {
    const {ethereum} = window;
    const [currentAccount, setCurrentAccount] = useState('');
    const [isRightChainId, setIsRightChainId] = useState<boolean | null>(null)

    const [connectWalletModalIsOpen, setConnectWalletModalIsOpen] = useState(false)
    const [mintModalIsOpen, setMintModalIsOpen] = useState(false)

    const toast = useToast();

    useEffect(()=>{
        _eventOnChangeWallet()
        _eventOnChangeChain()
    },[])

    useEffect(()=>{
        if(isRightChainId === false){
            toast.show(
                <span>
                    You are not on the {worknet.chainName} network.
                    Please <a className="link" onClick={changeChainId}>Switch Network</a>
                </span>
            )
        }
    }, [isRightChainId])

    const _eventOnChangeWallet = async () => {
        if(ethereum){
            const res = await checkWalletIsConnected();

            ethereum.on('accountsChanged', (accounts: string[]) => {
                console.log('Account changed! Address: ', accounts[0]);
                setCurrentAccount(accounts[0])
            });

            setCurrentAccount(res);
        }
    }

    const _eventOnChangeChain = async () => {
        if (ethereum) {
            setIsRightChainId(await checkChainId());

            ethereum.on('chainChanged', async(chainId: string) => setIsRightChainId(await checkChainId(chainId)));
        }
    }

    const _connectWallet = async () => {
        if(ethereum){
            const address = await connectWallet();
            if (address) {
                setCurrentAccount(address);
            }
        }else{
         toast.show('Please install Metamask!')
        }
    }

    const _disconnectWallet = async() => {
        const disconnected = await disconnectWallet();

        if (disconnected) {
            setCurrentAccount('');
        }
    };
    // todo нужен будет стейт менеджер, либо разделять контекст, чтобы не было ререндеров
    const value = useMemo(()=>(
        {connectWallet: _connectWallet,
            disconnectWallet: _disconnectWallet,
            currentAccount,
            isRightChainId,
            connectWalletModalIsOpen,
            mintModalIsOpen,
            setConnectWalletModalIsOpen,
            setMintModalIsOpen
        }
    ),[currentAccount, isRightChainId, connectWalletModalIsOpen, mintModalIsOpen])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;