import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import itemsSlice from "./itemsSlice";
import adminSlice from "./adminSlice";
import searchSlice from "./searchSlice";

const reducers = combineReducers({
    user: userSlice,
    items: itemsSlice,
    foundItems: adminSlice,
    searchKeyword: searchSlice
});

export default reducers;
