import { createSlice } from "@reduxjs/toolkit";
import apiRequest from '../../services'
import endpoints from "../../services/endpoints";

let initialState = {
    itemDetails: []
}

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        saveItemDetails: (state, action) => {
            state.itemDetails = { ...action.payload }
        },
        clearData: () => initialState
    }
});

//get items
export const fetchItems = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.items.fetchItems,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'businessUserToken'
        }).then(async (res) => {
            console.log(res)
            const { list,pageMeta } = res.data
            dispatch(saveItemDetails({list,pageMeta}))
            return resolve(true);
        }).catch(err => {
            console.log(err)
            return err
        })
    })
}
//get items in admin
export const adminfetchItems = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.items.fetchFoundItems,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'businessUserToken'
        }).then(async (res) => {
            console.log(res)
            const { list,pageMeta } = res.data
            dispatch(saveItemDetails({list,pageMeta}))
            return resolve(true);
        }).catch(err => {
            console.log(err)
            return err
        })
    })
}

export const { saveItemDetails, clearData } = itemsSlice.actions;
export const itemDetails = (state) => state.items?.itemDetails;

export default itemsSlice.reducer;
