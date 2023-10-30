import axios from 'axios';
import Loader from "../components/loader";
import { clearUserData } from '../redux/reducers/userSlice'
import { Toast } from '../components/toast';

let store;

export const injectStore = _store => {
    store = _store
};

const request = ({
    url,
    method,
    data = null,
    headers = null,
    params = null,
    isLoader = true,
}) => {
    return new Promise((resolve, reject) => {
        let config = {
            url: `${process.env.REACT_APP_PRIME_SERVICE_BASE_URL}${url}`,
            method: method,
            data: data,
            params: params,
            headers: {
                ...headers,
                // 'Authorization': await localStorage.getItem('TOKEN'),
                'Content-Type': 'application/json'
            },
        }

        if (isLoader) {
            showLoader(true)
        }

        //temporarily disabled because of cors issue
        // axios.defaults.withCredentials = true;

        axios(config).then(response => {
            showLoader(false)
            resolve(response?.data);
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


export default request;