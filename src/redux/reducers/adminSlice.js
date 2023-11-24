import { createSlice } from "@reduxjs/toolkit";
import apiRequest from '../../services'
import endpoints from "../../services/endpoints";

let initialState = {
    foundItemDetails: []
}

export const adminSlice = createSlice({
    name: "foundItems",
    initialState,
    reducers: {
        saveFoundItemDetails: (state, action) => {
            state.foundItemDetails = { ...action.payload }
        },
        clearData: () => initialState
    }
});

//get items
export const fetchFoundItems = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.items.fetchFoundItems,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'adminUserToken'
        }).then(async (res) => {
            const { list,pageMeta } = res.data
            console.log(res.data,"dat");
            dispatch(saveFoundItemDetails({list,pageMeta}))
            return resolve(true);
        }).catch(err => {
            console.log(err)
            return err
        })
    })
}

export const { saveFoundItemDetails, clearData } = adminSlice.actions;
export const foundItemDetails = (state) => state.foundItems?.foundItemDetails;

export default adminSlice.reducer;












