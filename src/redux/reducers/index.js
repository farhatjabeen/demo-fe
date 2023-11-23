import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import itemsSlice from "./itemsSlice";
import adminSlice from "./adminSlice";

const reducers = combineReducers({
    user: userSlice,
    items: itemsSlice,
    foundItems: adminSlice,
});

export default reducers;
