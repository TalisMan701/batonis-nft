/** Код бекенда для генерации сигнатур из адреса кошелька */
import Web3 from 'web3';
import type { Sign } from 'web3-core';
import env from '../env';


/**
 * Создает сигнатуру сообщения подписанную приватным ключом
 *
 * @param wallet - Адрес для которого
 *
 * @returns Sign - Сигнатура, обратный декод сообщения с сигнатурой должен выдать публичный адрес для переданного приват ключа
 */
export default function generateSignature(wallet: string): Sign {
    const web3 = new Web3();

    // Sign only hash of message
    const hash = web3.utils.keccak256(web3.eth.abi.encodeParameters(
        ['address', 'string'],
        [wallet, env.SIGNER_SALT]
    ));

    return web3.eth.accounts.sign(hash, env.SIGNER_PRIVATE_KEY);
}