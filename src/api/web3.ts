import {ContractInterface, ethers} from 'ethers';
import { mainnet, testnet } from './const';

export const worknet = testnet;

let providerInstance: ethers.providers.Web3Provider | null | undefined;
let contractInstance: ethers.Contract | null | undefined;
let paymentContract: ethers.Contract | null | undefined;

export function getProvider() {
    const { ethereum } = window;

    if (!providerInstance) {
        providerInstance = new ethers.providers.Web3Provider(ethereum);
    }

    return providerInstance;
}

export function getContract() {
    const provider = getProvider();

    if (!contractInstance) {
        contractInstance = new ethers.Contract(worknet.saleAddress, worknet.saleAbi, provider.getSigner());
    }

    return contractInstance;
}

export function getPaymentContract() {
    const provider = getProvider();

    if (!paymentContract) {
        paymentContract = new ethers.Contract(worknet.paymentAddress, worknet.paymentAbi, provider.getSigner());
    }

    return paymentContract;
}

export async function checkWalletIsConnected() {
    const { ethereum } = window;

    try {
        if (!ethereum) {
            throw new Error('Make sure you have Metamask installed!');
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (!accounts.length) {
            throw new Error('No authorized account found');
        }

        return accounts[0];
    }
    catch (err) {
        let message = 'Unknown Error'
        if (err instanceof Error) message = err.message
        console.log(message);

        return false;
    }
}

export async function connectWallet() {
    const { ethereum } = window;

    try {
        if (!ethereum) {
            alert('Please install Metamask!');

            throw new Error('No Metamask installed');
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        return accounts[0];
    }
    catch (err) {
        console.error('Connect wallet error: ', err);

        return null;
    }
}

export async function disconnectWallet() {
    const { ethereum } = window;

    try {
        if (!ethereum) {
            throw new Error('No Metamask installed');
        }

        await ethereum.request({
            method: 'eth_requestAccounts',
            // eslint-disable-next-line camelcase
            params: [{ eth_accounts: {} }]
        });

        return true;
    }
    catch (err) {
        console.error('Disconnect wallet error: ', err);

        return false;
    }
}