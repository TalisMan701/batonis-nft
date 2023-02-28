import React, {FC} from 'react';

interface ConnectWalletProps {
    connectWallet: any;
    networkError?: any;
    dismiss?: any;
}

const ConnectWallet: FC<ConnectWalletProps> = ({connectWallet, networkError, dismiss}) => {
    return (
        <>
            <div onClick={connectWallet}>Connect wallet!</div>
        </>
    );
};

export default ConnectWallet;
