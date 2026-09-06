export function saveInLocalStorage(key: string, value: any) {
    if (!value) return;
    localStorage.setItem(key, JSON.stringify(value));
}

export function importOutOfLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    if (!data) return;
    return JSON.parse(data);
}
