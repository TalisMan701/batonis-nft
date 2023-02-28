import {ContractInterface, ethers} from 'ethers';
import { mainnet, testnet } from './const';
import {getSignature} from './api';
import walletEncoder from '../utils/encoder';

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

export async function checkChainId(chainId?: string) {
    const { ethereum } = window;

    if (!ethereum) {
        return false;
    }

    const userChainId   = parseInt(chainId || await ethereum.request({ method: 'eth_chainId' }));
    const properChainId = parseInt(`${ worknet.workChainId }`);

    return userChainId === properChainId;
}

export async function changeChainId(): Promise<boolean> {
    const { ethereum } = window;

    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: ethers.utils.hexValue(worknet.workChainId)
            }]
        });
        return true
    }
    catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (err.code === 4902) {
            await addChainId();
            return changeChainId();
        }
        return false
        console.error(err);
    }
}

export async function addChainId() {
    const { ethereum } = window;

    await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                chainId: ethers.utils.hexValue(worknet.workChainId),
                chainName: worknet.chainName,
                nativeCurrency: {
                    name: worknet.coinName,
                    symbol: worknet.symbol,
                    decimals: worknet.decimals
                },
                blockExplorerUrls: [worknet.explorerUrl],
                rpcUrls: [worknet.rpcUrl],
            }
        ]
    });
}

export async function approvePaymentToken(count: number) {
    const paymentContract = getPaymentContract();

    return paymentContract.approve(worknet.saleAddress, count.toString());
}

export async function getPaymentBalance(userAddress: string) {
    const paymentContract = getPaymentContract();

    return paymentContract.balanceOf(userAddress);
}

export async function getPaymentAllowance(userAddress = worknet.saleAddress) {
    const paymentContract = getPaymentContract();
    const allowanceBN = await paymentContract.allowance(userAddress, worknet.saleAddress);

    return +allowanceBN.toString();
}

export async function getFromContract(method: string, ...args: any) {
    const contract = getContract();

    if (typeof contract[method] !== 'function') {
        console.warn(`Non exist method ${ method }`, contract);
        return null;
    }

    return contract[method](...args);
}

export async function getMaxSupply() {
    const max = await getFromContract('MAX_ELEMENTS');

    return Number.isNaN(+max) ? null : parseInt(max);
}

export async function getPurchasedCount() {
    return parseInt(await getFromContract('totalSupply'));
}

export async function getPrice() {
    return parseInt(await getFromContract('price'));
}

export async function saleIsOpen() {
    return !!(await getFromContract('saleState'));
}

export async function tokenURI(tokenId: number | string) {
    const url = await getFromContract('tokenURI', tokenId);

    return url;
}

export async function mint(sig: string) {
    const contract = getContract();

    return contract.mint(sig);
}

export async function buyProcess(userWallet: string, priceNFT: number) {
    // Check token balance
    const balance = await getPaymentBalance(userWallet);

    if (balance < priceNFT) {
        throw new Error(`Not enough balance. Current balance: ${ balance }`);
    }

    // Checks token allowance
    const allowance = await getPaymentAllowance(userWallet);

    if (allowance < priceNFT) {
        await approvePaymentToken(priceNFT);
    }

    // Checks sale state
    if (!await saleIsOpen()) {
        throw new Error('Sale not active');
    }

    // Get signature from backend
    let signature;

    try {
        signature = await getSignature(walletEncoder(userWallet));
    }
    catch (err) {
        console.error('Feiled to get signature, original error: ', err);
        throw new Error('Failed to get a signature');
    }

    // Mint ntf
    return mint(signature);
}

export function parseLogs(logs = []) {
    const iface = new ethers.utils.Interface(worknet.saleAbi);

    return logs.map((log) => {
        try {
            return iface.parseLog(log);
        }
        catch (err) {
            return null;
        }
    }).filter(parsed => parsed);
}

export function getTokenId(tx: any) {
    const log = parseLogs(tx.logs).find((log: any) => log.name === 'Transfer');
    console.log(log)
    const tokenId = log && log.args.tokenId;

    return tokenId && tokenId.toString() || tokenId;
}

export async function loadNFTImage(tokenId: string | number) {
    const url = await tokenURI(tokenId);
    console.log(url)
    const response = await fetch(_ipfsToUrl(url), {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });
    const metadata = await response.json();

    console.log(metadata)

    return _ipfsToUrl(metadata.image);
}

function _ipfsToUrl(url: any) {
    if (typeof url !== 'string') {
        return '';
    }

    return url.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
}