export async function getPriceToken(target: string, currency: string) {
    const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${ target }&tsyms=${ currency }`, {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    });

    const data = await response.json();

    return data[currency.toUpperCase()] as number;
}

export async function getSignature(encodeAddress: string) {
    const response = await fetch(`https://nft.batonis.tech/backend/api/v0/sign?key=${ encodeAddress }`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            accept: 'application/json'
        }
    });

    const data = await response.json();

    if (response.status !== 200 || !data.data.signature) {
        throw new Error(data.message || `Failed to get signature, status ${ response.status }`);
    }

    return data.data.signature as string;
}

