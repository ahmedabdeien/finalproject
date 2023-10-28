import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { categoriesReducer } from "./categoriesSlice";


export let store = configureStore({
    reducer:{
        counter:counterReducer,
        categories:categoriesReducer,
    }
});