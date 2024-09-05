import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminObserver:[],
    adminPartner:[],
    adminAuditLogs:[],
    PartnerDownload:[],
    perviousServery:[]
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminObserver: (state,actions) => {
      state.adminObserver = actions.payload;
    },
    setAdminPartner: (state,action) =>{
        state.adminPartner = action.payload
    },
    setAdminAuditLogs:(state,action)=>{
      state.adminAuditLogs = action.payload
    },
    setPartnerDownload:(state,action)=>{
      state.PartnerDownload = action.payload
    },
    setPreviousServey:(state,action)=>{
      state.perviousServery = action.payload
    },
  },
});

export const { setAdminObserver,setAdminAuditLogs,setPartnerDownload,setPreviousServey } = adminSlice.actions;
export default adminSlice.reducer;
