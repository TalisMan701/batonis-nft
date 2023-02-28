const stringify = JSON.stringify;

/**
 * Обычный JSON.stringify + добавляет шум
 * @param wallet
 */
function _serialize(wallet: string) {
    return stringify({
        wallet,
        nonce: Date.now() % 1000,
        message: ['H', 'i', ' ', 'b', 'o', 't', 's'].join(''),
    });
}

/**
 * Оффсеты на которые будет поделена строка
 *
 * @param len
 */
function _offsets(len: number) {
    return [
        [0, len - 32], // [0 32]
        [len - 32, len - 22], // [32 42]
        [len - 22, len - 2], // [42 62]
        [len - 2, len], // [62 64]
    ];
}
/**
 * Перемешивает строку по заданным оффсетам
 *
 * @param string
 * @param offsets
 */
function _mixer(string: string, offsets: number[][]) {
    return [
        string.slice(...offsets[0]),
        string.slice(...offsets[1]),
        string.slice(...offsets[2]),
        string.slice(...offsets[3]),
    ];
}
/**
 * Кодирует адрес кошелька в испорченный base64
 *
 * @param wallet
 */
export default function walletEncoder(wallet: string) {
    const base64 = btoa(_serialize(wallet));
    const [one, two, three, four] = _mixer(base64, _offsets(base64.length));
    return three + one + two + four;
}
