export function getFromLocalStorage(key: string, defValue: any) {
    let value = localStorage.getItem(key);

    if (value === 'NaN') {
        value = null;
    }

    return (value == null) ? defValue : value;
}

export function setToLocalStorage(key: string, value: any) {
    if (value === 'NaN') {
        return;
    }

    return localStorage.setItem(key, `${ value }`);
}