import { createSlice } from "@reduxjs/toolkit";
import apiRequest from '../../services'
import endpoints from "../../services/endpoints";

let initialState = {
    itemDetails: [],
    foundItemDetails: [],
    searchKey: [],
    userDetails:[],
    businessUserDetails:[],
}

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        saveItemDetails: (state, action) => {
            state.itemDetails = { ...action.payload }
        },
        saveFoundItemDetails: (state, action) => {
            state.foundItemDetails = { ...action.payload }
        },
        saveUserDetails: (state, action) => {
            state.userDetails = { ...action.payload }
        },
        saveBusinessUserDetails: (state, action) => {
            state.businessUserDetails = { ...action.payload }
        },
        saveItemData: (state, action) => {
            state.searchKey = { ...action.payload }
        },
        saveItemDataById: (state, action) => {
            state.searchKey = { ...action.payload }
        },

        clearData: () => initialState
    }
});

//get items
export const fetchItems = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.fetchItems}?page=1&limit=5`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'businessUserToken'
        }).then(async (res) => {
            const { list, pageMeta } = res.data
            dispatch(saveItemDetails({ list, pageMeta }))
            return resolve(true);
        }).catch(err => {
            console.log(err)
            return err
        })
    })
}
export const { saveItemDetails, clearData } = itemsSlice.actions;
export const itemDetails = (state) => state.items?.itemDetails;

//get items in admin
export const adminFetchItems = (currentPage = 1, PageLimit = 5) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.fetchFoundItems}?page=${currentPage}&limit=${PageLimit}`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'adminToken'
        }).then(async (res) => {
            console.log(res)
            const { list, pageMeta } = res.data
            dispatch(saveFoundItemDetails({ list, pageMeta }))
            return resolve(true);
        }).catch(err => {
            console.log(err)        
            return err
        })
    })
};
export const { saveFoundItemDetails } = itemsSlice.actions;
export const foundItemDetails = (state) => state.items?.foundItemDetails;



//get user in admin
export const adminFetchUser = (currentPage = 1, PageLimit = 5) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.fetchUserItems}?page=${currentPage}&limit=${PageLimit}`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'adminToken'
        }).then(async (res) => {
            console.log(res)
            const { list, pageMeta } = res.data
            dispatch(saveUserDetails({ list, pageMeta }))
            return resolve(true);
        }).catch(err => {
            console.log(err)        
            return err
        })
    })
};
export const { saveUserDetails } = itemsSlice.actions;
export const userDetails = (state) => state.items?.userDetails;

//get businessUser in admin
export const adminFetchBusinessUser = (currentPage = 1, PageLimit = 5) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.fetchBusinessUserItems}?page=${currentPage}&limit=${PageLimit}`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'adminToken'
        }).then(async (res) => {
            console.log(res)
            const { list, pageMeta } = res.data
            dispatch(saveBusinessUserDetails({ list, pageMeta }))
            return resolve(true);
        }).catch(err => {
            console.log(err)        
            return err
        })
    })
};
export const { saveBusinessUserDetails } = itemsSlice.actions;
export const businessUserDetails = (state) => state.items?.businessUserDetails;


// get items by keyword 
export const searchItem = (itemName) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.items.searchByKeyword,
            method: endpoints.ApiMethods.GET,
            params: { keyword: itemName }
        }).then(async (res) => {
            console.log(res.data, "rd")
            const { list, pageMeta } = res.data

            dispatch(saveItemData({ list, pageMeta }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

export const { saveItemData } = itemsSlice.actions;

export const searchKey = (state) => state.items?.searchKey;

// // company p 
// export const searchItemById = (itemId) => async (dispatch) =>{
//     return new Promise((resolve,reject)=>{
//         apiRequest({
//             url: `${endpoints.apiPath.items.searchById}/${itemId}`,
//             method: endpoints.ApiMethods.GET
//         }).then(async (res) =>{
//             const {list} = res.data
//             dispatch(saveItemDataById({list}))
//             return resolve(true)
//         }).catch(err => {
//             console.log(err)
//             return err;
//         })
//     })
// }

// export const {saveItemDataById} = itemsSlice.actions;
// export const searchDetailsById = (state) => console.log(state,"states");


export default itemsSlice.reducer;
