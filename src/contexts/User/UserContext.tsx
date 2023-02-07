import React, {createContext} from 'react';

interface IUserContext{
    connectWallet: () => void
    disconnectWallet: () => void
    currentAccount: string
    isRightChainId: boolean | null
    connectWalletModalIsOpen: boolean
    mintModalIsOpen: boolean
    setConnectWalletModalIsOpen: (value: boolean) => void
    setMintModalIsOpen: (value: boolean) => void
}

const defaultValue = {
    connectWallet: () => null,
    disconnectWallet: () => null,
    currentAccount: '',
    isRightChainId: null,
    connectWalletModalIsOpen: false,
    mintModalIsOpen: false,
    setConnectWalletModalIsOpen: () => false,
    setMintModalIsOpen: () => false
}

export const UserContext = createContext<IUserContext>(defaultValue)