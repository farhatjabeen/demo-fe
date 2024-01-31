import { combineReducers } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import itemsSlice from './itemsSlice'

const reducers = combineReducers({
  user: userSlice,
  items: itemsSlice,
})

export default reducers
