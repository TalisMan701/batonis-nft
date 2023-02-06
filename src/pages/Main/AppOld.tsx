import React, {useEffect, useState} from 'react';
import './App.module.scss';
import {ethers} from 'ethers';
import ConnectWallet from '../../components/ConnectWallet';
import batonisNFTAddress from '../../api/contracts/BatonisNFT-contract-address.json';
import batonisNFTArtifact from '../../api/contracts/BatonisNFT.json';
import Cursor from '../../components/Cursor/Cursor';
import CursorTestGSAP from '../../components/Cursor/CursorTestGSAP';

const POLYGON_MUMBAI_NETWORK_ID = '80001';
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const nfts = [
    {
        index: 0,
        img: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
    },
    {
        index: 1,
        img: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
        cid: 'bafkreih5wyo6m6lxqnyikp3vka3dtrlwkoflbwq6fxvvjne4xivmpbacoi',
    },
];

/* let _provider: any;
let _batonisNFT: any;*/

function AppOld() {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [txBeingSent, setTxBeingSent] = useState(null);
    const [balance, setBalance] = useState(null);
    const [countNFT, setCountNFT] = useState(null);
    const [networkError, setNetworkError] = useState('');
    const [transactionError, setTransactionError] = useState('');
    const [batonisNFT, setBatonisNFT] = useState<any>(null);
    const [provider, setProvider] = useState<any>(null);

    const _connectWallet = async () => {
        if (window.ethereum === undefined) {
            setNetworkError('Please install Metamask!');
            return;
        }
        const [selectedAddress] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        if (!_checkNetwork()) {
            return;
        }

        _initialize(selectedAddress);

        window.ethereum.on('accountsChanged', ([newAddress]: any) => {
            if (newAddress === undefined) {
                return _resetState();
            }
            _initialize(newAddress);
        });

        window.ethereum.on('chainChanged', ([networkId]: any) => {
            _resetState();
        });
    };

    const _initialize = async (selectedAddress: any) => {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider);

        setBatonisNFT(
            new ethers.Contract(
                batonisNFTAddress.BatonisNFT,
                batonisNFTArtifact.abi,
                _provider.getSigner(0),
            ),
        );

        setSelectedAccount(selectedAddress);
        console.log(selectedAddress);
    };

    useEffect(() => {
        _updateBalance();
        _updateCountNFT();
    }, [selectedAccount]);

    const _updateBalance = async () => {
        const newBalance = (await provider.getBalance(selectedAccount)).toString();
        setBalance(newBalance);
    };

    const _updateCountNFT = async () => {
        const newCountNFT = (await batonisNFT.balanceOf(selectedAccount)).toString();
        setCountNFT(newCountNFT);
    };

    const _resetState = () => {
        setSelectedAccount(null);
        setTxBeingSent(null);
        setBalance(null);
        setCountNFT(null);
        setNetworkError('');
        setTransactionError('');
    };

    const _checkNetwork = () => {
        if (window.ethereum.networkVersion === POLYGON_MUMBAI_NETWORK_ID) {
            return true;
        }
        setNetworkError('Please connect to polygon mumbai network');
        return false;
    };

    const _dismissNetworkError = () => {
        setNetworkError('');
    };

    const mint = async (cid: string) => {
        try {
            const tx = await batonisNFT.safeMint(selectedAccount, `ipfs://${cid}`);
            setTxBeingSent(tx.hash);
            await tx.wait();
        } catch (error: any) {
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
            console.error(error);
            setTransactionError(error);
        } finally {
            setTxBeingSent(null);
            await _updateBalance();
            await _updateCountNFT();
        }
    };

    return (
        <div>
            {txBeingSent && (
                <p>
                    Waiting for transaction <strong>{txBeingSent}</strong>
                </p>
            )}
            {!selectedAccount ? (
                <ConnectWallet
                    connectWallet={_connectWallet}
                    networkError={networkError}
                    dismiss={_dismissNetworkError}
                />
            ) : (
                <>
                    {balance && <p>Your balance: {ethers.utils.formatEther(balance)} MATIC</p>}
                    {countNFT && <p>Your have {countNFT} nft</p>}
                </>
            )}
            {networkError && <div>{networkError}</div>}
            <div>
                {nfts.map((nft) => {
                    return (
                        <div
                            key={nft.index}
                            onClick={() => mint(nft.cid)}
                            style={{cursor: 'pointer'}}
                        >
                            <img src={nft.img} alt='' style={{width: 350, height: 350}} />
                        </div>
                    );
                })}
            </div>
            <CursorTestGSAP/>
        </div>
    );
}

export default AppOld;
