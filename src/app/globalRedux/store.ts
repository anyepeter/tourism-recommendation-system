"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import counterReducer from "./site/siteSlice";


const rootReducer = combineReducers({
  site: counterReducer,
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });