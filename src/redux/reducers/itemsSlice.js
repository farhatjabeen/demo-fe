import { createSlice } from "@reduxjs/toolkit";
import apiRequest from '../../services'
import endpoints from "../../services/endpoints";
import { Toast } from "../../components/toast";

let initialState = {
    itemDetails: [],
    foundItemDetails: [],
    searchKey: [],
    searchId: [],
    viewDetailsById: []
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
            state.searchId = { ...action.payload }
        },
        viewItemDetailsById: (state, action) => {
            state.viewDetailsById = { ...action.payload }
        },

        clearItemState: () => initialState
    }
});

//get items
export const fetchItems = (currentPage , PageLimit ) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.fetchItems}?page=${currentPage}&limit=${PageLimit}`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'businessUserToken'
        }).then(async (res) => {
            const { list, pageMeta } = res.data
            dispatch(saveItemDetails({ list, pageMeta }))
            Toast({ type: "success", message: res.message })
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
    console.log("itemName", itemName)
    return new Promise((resolve, reject) => {
        apiRequest({
            // url: `${endpoints.apiPath.items.searchByKeyword}?keyword=${itemName}`,
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

// get items by id
export const searchItemById = (itemId) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.searchById}/${itemId}`,
            method: endpoints.ApiMethods.GET
        }).then((res) => {
            const { itemName, location, foundDate, foundTime } = res.data
            dispatch(saveItemDataById({ itemName, location, foundDate, foundTime }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
};

export const searchDetailsById = (state) => state.items?.searchId;

// get item details of business user by id
export const viewItemById = (itemsId) => async (dispatch) =>{
    return new Promise((resolve,reject) =>{
        apiRequest({
            url: `${endpoints.apiPath.items.viewById}/${itemsId}`,
            method: endpoints.ApiMethods.GET,
        }).then((res) => {
            const { itemName, itemCategory, itemDescription, keywords, location, locationIdentifiers, userName, mobileNumber, emailMailId } = res.data
            dispatch(viewItemDetailsById({ itemName, itemCategory, itemDescription, keywords, location, locationIdentifiers, userName, mobileNumber, emailMailId }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

export const viewDetails = (state) => state.items?.viewDetailsById;

export const clearItemData = (data) => async (dispatch) => {
    try {
        dispatch(clearItemState());
    } catch (error) {
        return error
    }
}


export const { saveFoundItemDetails, clearItemState, saveItemDataById, viewItemDetailsById } = itemsSlice.actions;


export default itemsSlice.reducer;
