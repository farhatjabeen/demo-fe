import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productsSlice from "./productsSlice";

const reducers = combineReducers({
    user: userSlice,
    products: productsSlice
});

export default reducers;
