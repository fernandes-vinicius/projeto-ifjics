import { AsyncStorage } from 'react-native';

import basekey from './constants';

async function setItem(key, value) {
    try {
        await AsyncStorage.setItem(basekey + key, JSON.stringify(value));
    } catch (error) {
        return error;
    }
}

async function getItem(key) {
    try {
        return JSON.parse(await AsyncStorage.getItem(basekey + key));
    } catch (error) {
        return error;
    }
}

async function removeItem(key) {
    try {
        await AsyncStorage.removeItem(basekey + key);
    } catch (error) {
        return error;
    }
}

const deviceStorage = {
    setItem,
    getItem,
    removeItem,
}

export default deviceStorage;
