import { createSlice } from "@reduxjs/toolkit";
import apiRequest from '../../services'
import endpoints from "../../services/endpoints";
import { setEncryptedLocalStorageData } from "../../utils/helper";
import { Toast } from "../../components/toast";

const initialState = {
    userData: null,
    userProfile: null,
    queryData: null,
    userMail: null,
    registerUser: null,
    generalUserProfile: null,
    getLogoImage: null,
    getGeneralUser: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            state.userData = { ...action.payload };
        },
        saveGeneralUserMail: (state, action) => {
            state.userMail = { ...action.payload };
        },
        registerGeneralUserMail: (state, action) => {
            state.registerUser = { ...action.payload };
        },
        saveCompanyProfile: (state, action) => {
            state.userProfile = { ...action.payload };
        },
        saveUserProfile: (state, action) => {
            state.generalUserProfile = { ...action.payload };
        },
        saveQueryData: (state, action) => {
            state.queryData = { ...action.payload };
        },
        getLogo: (state, action) => {
            state.getLogoImage = { ...action.payload };
        },
        getUserDetails: (state,action) => {
            state.getGeneralUser = {...action.payload};
        },

        clearData: () => initialState
    }
});

// business user sign in
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

export const userDetails = (state) => console.log(state, 'state');

export const checkGeneralUserEmail = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.checkEmail,
            method: endpoints.ApiMethods.POST,
            data: data
        }).then((res) => {
            const {status} = res
            const { emailMailId, isAlreadyRegistered } = res.data
            dispatch(saveGeneralUserMail({ emailMailId, isAlreadyRegistered, status }))
            return resolve(true);
        }).catch(err => {
            console.log(err)
            return err
        })
    })
}

export const mailId = (state) => state.user?.userMail;

export const generalUserRegister = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.registerGeneralUser,
            method: endpoints.ApiMethods.POST,
            data: data
        }).then((res) => {
            Toast({type:"success",message:res.message})
            return resolve(true);
        }).catch(err => {
            console.log(err)
            return err
        })
    })
}

export const generalUserLogin = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.loginGeneralUser,
            method: endpoints.ApiMethods.POST,
            data: data
        }).then((res) => {
            const { role, emailMailId, mobileNumber, name, _id, token } = res.data
            dispatch(saveUserData({ role, emailMailId, mobileNumber, name, _id, token }))
            setEncryptedLocalStorageData("userToken", token);
            Toast({type:"success",message: res.message})
            return resolve(true);
        }).catch(err => {
            console.log(err)
            resolve(false)
            return err
        })
    })
}

// general user logout **
export const generalUserLogout = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.logoutGeneralUser,
            method: endpoints.ApiMethods.POST,
            isAuth: true,
        }).then((res) => {
            Toast({type:"success",message: res.message})
            return resolve(true);
        }).catch(err => {
            console.log(err)
            resolve(false)
            return err
        })
    })
}

// business user sign-up
export const businessUserRegister = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.registerBusinessUser,
            method: endpoints.ApiMethods.POST,
            data: data
        }).then((res) => {
            Toast({type:"success",message: res.message})
            return resolve(true);
        }).catch(err => {
            console.log(err)
            return err
        })
    })
}
//forgot password in businessuser
export const businessForgotPassword = (data) => async () => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.forgotPasswordBusiness,
            method: endpoints.ApiMethods.POST,
            data: data,
        }).then(res => {
            return resolve(true);
        }).catch(err => {
            reject(err);
            console.log('rejected', err)
        })
    })
}
// reset password in businessuser
export const businessResetPassword = (data, token) => async () => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.resetPasswordBusiness}/${token}`,
            method: endpoints.ApiMethods.POST,
            data: data,
            tokenType: 'businessUserToken',
        }).then(res => {
            Toast({ type: "success", message: res.message })
            return resolve(res);
        }).catch(err => {
            reject(err);
            console.log('rejected', err)
        })
    })
}

// business user logout 
export const businessUserLogout = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.logoutBusinessUser,
            method: endpoints.ApiMethods.POST,
            isAuth: true,
            tokenType: 'businessUserToken',
        }).then((res) => {
            Toast({type:"success",message: res.message})
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

export const adminResetPassword = (data) => async () => {

    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.resetPasswordAdmin,
            method: endpoints.ApiMethods.PUT,
            data: data,
            isAuth: true,
            tokenType: 'adminToken',
        }).then(res => {
            return resolve(true);
        }).catch(err => {
            reject(err);
            console.log('rejected', err)
        })
    })
}

export const clearUserData = () => async (dispatch) => {
    try {
        dispatch(clearData());
    } catch (error) {
        return error
    }
}

export const userData = (state) => state.user?.userData;

export const companyProfileData = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.businessProfile,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'businessUserToken'
        }).then((res) => {
            const { companyName, companyCategory, location, name, mobileNumber, emailMailId } = res.data
            dispatch(saveCompanyProfile({ companyName, companyCategory, location, name, mobileNumber, emailMailId }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

//user profile edit
export const userProfileData = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.userProfile,
            method: endpoints.ApiMethods.PUT,
            isAuth: true,
            data: data
        }).then((res) => {
            console.log(res,"apiresp")
            Toast({type:"success",message:res.message})
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

// get user details
export const generalUserDetails = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.userDetails,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
        }).then((res) => {
            const { emailMailId, name, mobileNumber } = res.data
            dispatch(getUserDetails({ emailMailId, name, mobileNumber }))
            return resolve(res)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

// get business user details
export const businessUserDetails = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.userDetails,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
        }).then((res) => {
            const { emailMailId, name, mobileNumber } = res.data
            dispatch(getUserDetails({ emailMailId, name, mobileNumber }))
            return resolve(res)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

// company profile
export const editCompanyProfileData = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.editBusinessProfile,
            method: endpoints.ApiMethods.PUT,
            isAuth: true,
            tokenType: 'businessUserToken',
            data: data
        }).then( (res) => {
            Toast({type:"success",message:res.message})
            const { companyName, companyCategory, location, name, mobileNumber, emailMailId } = res.data
            dispatch(saveCompanyProfile({ companyName, companyCategory, location, name, mobileNumber, emailMailId }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

export const contactAdmin = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.contactAdmin,
            method: endpoints.ApiMethods.POST,
            data: data
        }).then((res) => {
            Toast({type:"success",message:res.message})

            return resolve(true);
        }).catch((err) => {
            reject(err)
        })
    })
}

export const userProfile = (state) => state.user?.userProfile;
export const generalUserData = (state) => state.user?.getGeneralUser;

export const { saveUserData, getUserDetails, getLogo, saveUserProfile, saveCompanyProfile, registerGeneralUserMail, saveGeneralUserMail, saveQueryData, clearData } = userSlice.actions;

export default userSlice.reducer;