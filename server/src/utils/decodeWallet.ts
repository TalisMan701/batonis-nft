import { Buffer } from 'buffer';

export default function decodeWallet(base64: string): string {
    const len = base64.length;

    const part4 = base64.slice(len - 2, len);
    const part3 = base64.slice(0, 20);
    const part2 = base64.slice(len - 12, len - 2);
    const part1 = base64.slice(20, len - 12);

    // @ts-ignore
    const { wallet } = JSON.parse(Buffer.from(part1 + part2 + part3 + part4, 'base64'));

    return wallet;
}

