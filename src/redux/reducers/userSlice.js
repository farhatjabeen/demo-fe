import { createSlice } from "@reduxjs/toolkit";
import apiRequest from '../../services'
import endpoints from "../../services/endpoints";
import { setEncryptedLocalStorageData } from "../../utils/helper";
// import { Toast } from "../../components/toast";

const initialState = {
    userData: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            state.userData = {
                ...action.payload
            };
        },
        clearData: () => initialState
    }
});


export const loginUser = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.login,
            method: endpoints.ApiMethods.POST,
            data: data
        }).then((res) => {
            const { role, emailMailId, _id, token } = res.data
            dispatch(saveUserData({ role, emailMailId, _id }))
            setEncryptedLocalStorageData("businessUserToken", token);
            return resolve(true);
        }).catch(err => {
            console.log(err)
            resolve(false)
            return err
        })
    })
}


export const changePassword = (data) => async (dispatch) => {

    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.login,
            method: endpoints.ApiMethods.POST,
            data: data
        }).then(res => {
            return resolve(res?.data);
        }).catch(err => {
            reject(err)
        })
    })
}


export const clearUserData = (data) => async (dispatch) => {
    try {
        dispatch(clearData());
    } catch (error) {
        return error
    }
}

export const { saveUserData, clearData } = userSlice.actions;

export const userData = (state) => state.user.userData;

export default userSlice.reducer;
