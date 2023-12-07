import Loader from "../components/loader";
import { clearUserData } from '../redux/reducers/userSlice'
import { Toast } from '../components/toast';
import { axiosInstance, getAuthToken, logout } from "../utils/helper"

let store;

export const injectStore = _store => {
    store = _store
};

const apiRequest = ({
    url,
    method,
    apiVersion = 'v1',
    data = null,
    headers = null,
    params = null,
    isLoader = true,
    isAuth = false,
    tokenType = 'userToken' // possible values -> userToken, businessUserToken, adminToken
}) => {
    if (isAuth) axiosInstance.defaults.headers.common.Authorization = `${getAuthToken(tokenType)}`;
    // If token not found redirect user to the login screen
    return new Promise((resolve, reject) => {
        let config = {
            url: `${process.env.REACT_APP_BACKEND_CORE_SERVICE_BASE_URL}${apiVersion}${url}`,
            method: method,
            data: data,
            params: params,
            // headers: {
            //     ...headers,
            //     // 'Authorization': await localStorage.getItem('TOKEN'),
            //     'Content-Type': 'application/json'
            // },
        }
        if (isLoader) {
            showLoader(true)
        }

        //temporarily disabled because of cors issue
        // axios.defaults.withCredentials = true;

        axiosInstance(config).then(response => {
            showLoader(false)
            resolve(statusHandler(response));
        }).catch(error => {
            showLoader(false);
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

export const statusHandler = (response, exposeHeaders = true) => {
    const headers = {};

    if (response.status === 401 || response.status === 403) {
        Toast({ type: 'error', message: response.statusText });
        setTimeout(() => logout(), 1000);
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
