import { createSlice } from "@reduxjs/toolkit";
import apiRequest from '../../services'
import endpoints from "../../services/endpoints";
import { setEncryptedLocalStorageData } from "../../utils/helper";
// import { Toast } from "../../components/toast";

const initialState = {
    userData: null,
    userProfile: null,
    queryData: null
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
        saveCompanyProfile: (state, action) => {
            state.userProfile = { ...action.payload };
        },
        saveQueryData: (state, action) => {
            state.queryData = {
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
export const loginAdminUser = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.loginAdmin,
            method: endpoints.ApiMethods.POST,
            data: data
        }).then((res) => {
            const { role, emailMailId, _id, token } = res.data
            dispatch(saveUserData({ role, emailMailId, _id }))
            setEncryptedLocalStorageData("adminToken", token);
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

export const userData = (state) => state.user.userData;

export const companyProfileData = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.businessProfile,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'businessUserToken'
        }).then(async (res) => {
            console.log(res.data, "rd")
            const { companyName, companyCategory, location, name, mobileNumber, emailMailId } = res.data
            dispatch(saveCompanyProfile({ companyName, companyCategory, location, name, mobileNumber, emailMailId }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

export const editCompanyProfileData = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.editBusinessProfile,
            method: endpoints.ApiMethods.PUT,
            isAuth: true,
            tokenType: 'businessUserToken',
            data: data
        }).then(async (res) => {
            console.log(res.data, "editdata")
            const { companyName, companyCategory, location, name, mobileNumber, emailMailId } = res.data
            dispatch(saveCompanyProfile({ companyName, companyCategory, location, name, mobileNumber, emailMailId }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

export const userProfile = (state) => state.user?.userProfile;

export const contactAdmin = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.contactAdmin,
            method: endpoints.ApiMethods.POST,
            data: data
        }).then((res) => {
            return resolve(true);
        }).catch((err) => {
            reject(err)
        })
    })
}

export const { saveUserData, saveCompanyProfile, saveQueryData, clearData } = userSlice.actions;

export default userSlice.reducer;