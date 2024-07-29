import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sites: [],
    user: {},
  };
  
  export const counterSlice = createSlice({
    name: "tourism",
    initialState,
    reducers: {
      increment: (state, action) => {
        state.sites = action.payload;
      },
      addUser: (state, action) => {
        state.user = action.payload;
      }
    }}
    )

export const { increment, addUser } = counterSlice.actions;
export default counterSlice.reducer;