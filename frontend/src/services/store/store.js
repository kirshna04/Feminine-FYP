import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import { userAccountApi } from "../api's/common/userAccountApi";
import storage from "redux-persist/lib/storage";
import {persistReducer} from 'redux-persist'

const config = {key:"root",version:1,storage}

const reducers = combineReducers({cart:cartReducer,api: userAccountApi.reducer})

const persistedReducer = persistReducer(config,reducers)
export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(userAccountApi.middleware),
})

