import { createSlice } from "@reduxjs/toolkit";
import request from '../../services'
import endpoints from "../../services/endpoints";

let initialState = {
    productsInfo: []
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        saveProductsInfo: (state, action) => {
            state.productsInfo = { ...action.payload }
        },
        clearData: () => initialState
    }
});

//get products
export const fetchProducts = () => async (dispatch) => {
    try {
        request({
            url: endpoints.EndPoints.products.fetchProducts,
            method: endpoints.ApiMethods.GET
        }).then(res => {
            dispatch(saveProductsInfo(res));
        }).catch(err => {
        })
    } catch (error) {
    }
}

export const { saveProductsInfo } = productsSlice.actions;
export const productsInfo = (state) => state.products?.productsInfo;

export default productsSlice.reducer;