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
        // 'Content-Type': 'application/json'
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
    return Promise.resolve().then(function () {
        return localStorage.getItem(storageKeyMapper[key])
    });
};

export const setLocalStorageData = (key, value) => {
    if (!key && !value) return null;
    return Promise.resolve().then(() => {
        localStorage.setItem(storageKeyMapper[key], value)
    });
};

export const getDecryptedLocalStorageData = (key) => {
    if (!key || !storageKeyMapper[key]) return null;
    return Promise.resolve().then(function () {
        const data = localStorage.getItem(storageKeyMapper[key])
        if (data) {
            return Encryption.decrypt(data.toString());
        }
        return '';
    });
};

export const setEncryptedLocalStorageData = (key, value) => {
    if (!key && !value) return null;
    const data = Encryption.encrypt(value);
    return Promise.resolve().then(function () {
        localStorage.setItem(storageKeyMapper[key], data);
    });
};
