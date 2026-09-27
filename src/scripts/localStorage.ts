/**
 * Saves a truthy value in the browser's local storage.
 * @param key - The storage key.
 * @param value - The value to serialize and store.
 */
export function saveInLocalStorage(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves and deserializes a value from the browser's local storage.
 * @param key - The storage key.
 * @returns The stored value, or undefined when no value exists.
 */
export function importOutOfLocalStorage(key: string): unknown {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
}
