import axios from 'axios'

import { storageKeyMapper } from "../config/constants";
import Encryption from './encryption'

/**
 * Extract the right error message from react-hook-form error object
 *
 * @param {object} errors Errors object from react-hook-form
 * @param {object} fieldArrayError  { index, fieldName: "date", arrayName: "callLogs", }
 * @param {string} name
 */

export const getFormErrorMessage = (errors, name) => {
    if (!name || !errors) return null;

    if (errors && name) {
        return errors[name]
    }
};

/**
 * Creating Axios Instance
*/
export const axiosInstance = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // 'Content-Type': 'text/plain' // if API's encrypted
    }
});

export const logout = () => {
    axiosInstance.defaults.headers.common.Authorization = '';
    localStorage.clear();
    setTimeout(() => {
        window.location.pathname = '/';
    }, 200);
};

export const getAuthToken = (type) => {
    return getDecryptedLocalStorageData(type)
}

export const getLocalStorageData = (key) => {
    if (!key || !storageKeyMapper[key]) return null;
    localStorage.getItem(storageKeyMapper[key])
};

export const setLocalStorageData = (key, value) => {
    if (!key && !value) return null;
    localStorage.setItem(storageKeyMapper[key], value)
};

export const getDecryptedLocalStorageData = (key) => {
    if (!key || !storageKeyMapper[key]) return null;
    const data = localStorage.getItem(storageKeyMapper[key])
    return Encryption.decrypt(data.toString());
};

export const setEncryptedLocalStorageData = (key, value) => {
    if (!key && !value) return null;
    const data = Encryption.encrypt(value);
    return localStorage.setItem(storageKeyMapper[key], data);
};
