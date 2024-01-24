import Loader from "../components/loader";
import { clearUserData } from '../redux/reducers/userSlice'
import { Toast } from '../components/toast';
import { axiosInstance, getAuthToken, logout } from "../utils/helper"
import axios from "axios";

let store;

export const injectStore = _store => {
    store = _store
};

export const getExportFileStream = async ({ url, isAuth, tokenType = "adminToken", apiVersion = 'v1' }) => {
    try {
        return await axios.get(
            `${process.env.REACT_APP_BACKEND_CORE_SERVICE_BASE_URL}${apiVersion}${url}`, {
            accept: 'application/json',
            Authorization: isAuth ? await getAuthToken(tokenType) : "",
        })
    } catch (error) {
        console.log("getExportFileStream API error", error)
    }
};

const apiRequest = async ({
    url,
    method,
    apiVersion = 'v1',
    data = undefined,
    headers = null,
    params = undefined,
    isLoader = false,
    isAuth = false,
    isFile = false,
    tokenType = 'userToken' // possible values -> userToken, businessUserToken, adminToken
}) => {
    if (isAuth) axiosInstance.defaults.headers.common.Authorization = `${await getAuthToken(tokenType)}`;
    // If token not found redirect user to the login screen
    return new Promise((resolve, reject) => {
        let config = {
            url: `${process.env.REACT_APP_BACKEND_CORE_SERVICE_BASE_URL}${apiVersion}${url}`,
            method: method,
            data: data,
            params: params
        }
        if (!isFile) {
            axiosInstance.defaults.headers.common["Content-Type"] = "application/json"
        } else {
            axiosInstance.defaults.headers.common["Content-Type"] = "multipart/form-data"
        }
        if (isLoader) {
            showLoader(true)
        }

        //temporarily disabled because of cors issue
        // axios.defaults.withCredentials = true;

        axiosInstance(config).then(response => {
            showLoader(false)
            resolve(statusHandler(response, tokenType));
        }).catch(error => {
            showLoader(false);
            resolve(statusHandler(error.response, tokenType));
            if (error?.code === "ERR_NETWORK") {
                Toast({ type: "error", message: "Server is under maintenance. Please try again later." });
            } else {
                Toast({ type: "error", message: error?.response?.data?.message });
            }
            reject(error?.response?.data?.message);
            if (error?.response?.status === 401) {
                store.dispatch(clearUserData());
                // window.location.replace('/auth/login');
            }
        });
    });
}

const showLoader = (status) => {
    if (Loader?.render?.defaultProps) {
        Loader.render.defaultProps.setLoaderStatus(status)
    }
}

export const statusHandler = (response, tokenType, exposeHeaders = true) => {
    const headers = {};

    if (response?.status === 401 || response?.status === 403) {
        Toast({ type: 'error', message: response.statusText });
        setTimeout(() => logout(tokenType), 1000);
    }

    if (exposeHeaders) {
        headers.headers = { ...response.headers };
    }
    if (response.status) {
        return {
            status: response.status,
            ...response.data,
            ...headers
        };
    }
    return exposeHeaders ? { ...headers, data: response.data } : response.data;
};

export default apiRequest;
