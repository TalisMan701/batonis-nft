import React, {useEffect, useState} from 'react';
import classes from './ContractController.module.scss';
import ReactPortal from '../ReactPortal/ReactPortal';
import {useAppSelector} from '../../hooks/reduxHooks';
import {
    getContract,
    getFromContract,
    getPaymentContract,
    getPrice,
    saleIsOpen,
} from '../../api/web3';

const ContractController = () => {
    const [paymentToken, setPaymentToken] = useState<string | null>(null);
    const [paymentTokenTemp, setPaymentTokenTemp] = useState<string>('');
    const [priceMintNFT, setPriceMintNFT] = useState<number | null>(null);
    const [addressForGetTokens, setAddressForGetTokens] = useState<string>('');
    const [baseURI, setBaseURI] = useState<string>('');
    const [signSalt, setSignSalt] = useState<string>('');
    const [saleState, setSaleState] = useState(false);
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        getPaymentToken();
        getPriceMintNFT();
        getSaleState();
    }, []);

    const checkIsOwner = () => {
        return user.currentAccount === process.env.REACT_APP_OWNER_CONTRACT;
    };

    const getPaymentToken = async () => {
        setPaymentToken(await getFromContract('paymentToken'));
    };

    const getPriceMintNFT = async () => {
        setPriceMintNFT(await getPrice());
    };

    const getSaleState = async () => {
        setSaleState(await saleIsOpen());
    };

    const _setPaymentToken = async (address: string) => {
        if (checkIsOwner()) {
            try {
                const contract = getContract();
                const tx = await contract.setPaymentToken(address);
                console.log(address);
                console.log(tx);
                console.log('Set payment token', tx.hash);
                await tx.wait();
                setPaymentToken(address);
            } catch (err: any) {
                const error = (err.error && err.error.data && err.error.data.originalError) || err;
                const message = (error.message || err.message).replace('execution reverted: ', '');
                console.log(message);
            } finally {
                setPaymentTokenTemp('');
            }
        }
    };

    const _mintTokensForAddress = async (address: string) => {
        if (checkIsOwner()) {
            try {
                const contract = getPaymentContract();
                const tx = await contract.mint(address, '100000000000000000');
                await tx.wait();
            } catch (err: any) {
                const error = (err.error && err.error.data && err.error.data.originalError) || err;
                const message = (error.message || err.message).replace('execution reverted: ', '');
                console.log(message);
            } finally {
                setAddressForGetTokens('');
            }
        }
    };

    const _setSaleState = async (state: 1 | 0) => {
        if (checkIsOwner()) {
            try {
                const contract = getContract();
                const tx = await contract.setSaleState(state);
                await tx.wait();
                setSaleState(!!state);
            } catch (err: any) {
                const error = (err.error && err.error.data && err.error.data.originalError) || err;
                const message = (error.message || err.message).replace('execution reverted: ', '');
                console.log(message);
            }
        }
    };

    const _setBaseURI = async (_baseURI: string) => {
        if (checkIsOwner()) {
            try {
                const contract = getContract();
                const tx = await contract.setBaseURI(_baseURI);
                await tx.wait();
            } catch (err: any) {
                const error = (err.error && err.error.data && err.error.data.originalError) || err;
                const message = (error.message || err.message).replace('execution reverted: ', '');
                console.log(message);
            } finally {
                setBaseURI('');
            }
        }
    };

    const _setSignSalt = async (_signSalt: string) => {
        if (checkIsOwner()) {
            try {
                const contract = getContract();
                const tx = await contract.setSignSalt(_signSalt);
                await tx.wait();
            } catch (err: any) {
                const error = (err.error && err.error.data && err.error.data.originalError) || err;
                const message = (error.message || err.message).replace('execution reverted: ', '');
                console.log(message);
            } finally {
                setSignSalt('');
            }
        }
    };

    return (
        <ReactPortal wrapperId={'react-portal-contract-controller'}>
            <div className={classes.wrapper}>
                <div>User: {user.currentAccount}</div>
                <div>Sale {saleState ? 'open' : 'close'}</div>
                <>
                    {paymentToken && <div>Payment: {paymentToken}</div>}
                    {priceMintNFT && <div>Price NFT: {priceMintNFT}</div>}
                </>
                <div>
                    <input
                        type='text'
                        value={paymentTokenTemp}
                        onChange={(e) => setPaymentTokenTemp(e.target.value)}
                    />
                    <div
                        className={classes.btn}
                        onClick={() => {
                            if (paymentTokenTemp) {
                                _setPaymentToken(paymentTokenTemp);
                            }
                        }}
                    >
                        Set payment token
                    </div>
                </div>
                <div>
                    <input
                        type='text'
                        value={addressForGetTokens}
                        onChange={(e) => setAddressForGetTokens(e.target.value)}
                    />
                    <div
                        className={classes.btn}
                        onClick={() => {
                            if (addressForGetTokens) {
                                _mintTokensForAddress(addressForGetTokens);
                            }
                        }}
                    >
                        Mint BTNT tokens for address
                    </div>
                </div>
                <div>
                    <input
                        type='text'
                        value={baseURI}
                        onChange={(e) => setBaseURI(e.target.value)}
                    />
                    <div
                        className={classes.btn}
                        onClick={() => {
                            if (baseURI) {
                                _setBaseURI(baseURI);
                            }
                        }}
                    >
                        Set baseURI
                    </div>
                </div>
                <div>
                    <input
                        type='text'
                        value={signSalt}
                        onChange={(e) => setSignSalt(e.target.value)}
                    />
                    <div
                        className={classes.btn}
                        onClick={() => {
                            if (signSalt) {
                                _setSignSalt(signSalt);
                            }
                        }}
                    >
                        Set signSalt
                    </div>
                </div>
                <div>
                    <span
                        onClick={() => {
                            if (!saleState) _setSaleState(1);
                        }}
                    >
                        Open Sale
                    </span>
                    <span
                        onClick={() => {
                            if (saleState) _setSaleState(0);
                        }}
                    >
                        Close Sale
                    </span>
                </div>
            </div>
        </ReactPortal>
    );
};

export default ContractController;
