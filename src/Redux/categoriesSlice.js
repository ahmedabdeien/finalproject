import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let getCategories = createAsyncThunk('counterSlice/getCategories',
async ()=>{
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
return data.data;
}
)
let initialState = {categories:[],isError:null}
let categoriesSlice = createSlice({
    name:'categoriesSlice',
    initialState,
    extraReducers:{
        [getCategories.pending]:(state,action)=>{
            state.loading = true;
         },
        [getCategories.fulfilled]:(state,action)=>{
            state.categories = action.payload 
            state.loading = false;
        },
        [getCategories.rejected]:(state,action)=>{
             // state.isError = action.payload 
              state.loading = false;
         },
        } 
    
})
export let categoriesReducer = categoriesSlice.reducer;