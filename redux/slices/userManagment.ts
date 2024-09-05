import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUser:[]
};

const userSlice = createSlice({
  name: "alluser",
  initialState,
  reducers: {
    setallUser: (state,actions) => {
      state.allUser = actions.payload;
    },
 
  },
});

export const { setallUser} = userSlice.actions;
export default userSlice.reducer;
