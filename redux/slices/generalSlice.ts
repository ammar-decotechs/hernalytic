import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  openSider: false,
  activeModal: null
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setOpen: (state, { payload }) => {
        return { ...state, open: payload };
    },
    setOpenSider: (state, { payload }) => {
      return { ...state, openSider: payload };
    },

    setActiveModal:(state, {payload})=>{
        return {...state, activeModal:payload}
    }
     
  
  },
});

export const { setOpen ,setOpenSider ,setActiveModal} = generalSlice.actions;
export default generalSlice.reducer;
