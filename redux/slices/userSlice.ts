import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  dob: "",
  phone: "",
  role: null,
  gender: "",
  access_token: null,
  has_cp: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      console.log("payload inside reducer", payload);
      return { ...state, ...payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
