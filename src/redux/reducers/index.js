import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import itemsSlice from "./itemsSlice";
import searchSlice from "./searchSlice";

const reducers = combineReducers({
    user: userSlice,
    items: itemsSlice,
    searchKeyword: searchSlice
});

export default reducers;
