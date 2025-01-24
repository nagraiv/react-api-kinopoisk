import defaultSettings from '../data/defaultSettings.json';

const LOCAL_STORAGE_KEY = defaultSettings["localStorageKey"];

export const restoreState = () => {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    } catch (e) {
        console.error('Произошла ошибка при восстановлении данных', e);
        return {};
    }

}

export const restoreProperty = (property) => {
    const value = restoreState()[property];
    if (value !== undefined) {
        return value;
    }
    return defaultSettings.defaultData[property];
}

export const setProperty = (propertyKey, property) => {
    const oldState = restoreState();
    const newState = {
        ...oldState,
        [propertyKey]: property,
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
}