import { createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../services";
import endpoints from "../../services/endpoints";
import { data } from "autoprefixer";
import userSlice from "./userSlice";

const initialState = {
    searchKey: null
};

export const searchSlice = createSlice({
    name: "searchKeyword",
    initialState,
    reducers: {
        saveItemData: (state, action) => {
            state.searchKey = { ...action.payload }
        },
        clearData: () => initialState
    }
});

export const searchItem = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.items.searchKey,
            method: endpoints.ApiMethods.GET,
            data: data
        }).then(async (res) => {
            const { list, pageMeta } = res.data
            dispatch(saveItemData({ list, pageMeta }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

export const { saveItemData, clearData } = userSlice.actions;

export const searchKey = (state) => console.log(state,"state");

export default searchSlice.reducer;
