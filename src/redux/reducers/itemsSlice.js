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
            const { data } = res.data
            dispatch(saveItemDetails({ data }))
            return resolve(true);
        }).catch(err => {
            console.log(err)
            return err
        })
    })
}

export const { saveItemDetails, clearData } = itemsSlice.actions;
export const itemDetails = (state) => state.Items?.itemDetails;

export default itemsSlice.reducer;
