import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false
  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
        return { ...state, loading: payload };
    },
  },
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;