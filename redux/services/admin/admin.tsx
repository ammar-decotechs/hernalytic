import { privateAPI, attachToken } from "@/config/config";
import { store } from "@/redux/store";
import { setAdminObserver } from "@/redux/slices/admin";
import { setAdminAuditLogs,setPartnerDownload,setPreviousServey } from "@/redux/slices/admin";
import { setallUser } from "@/redux/slices/userManagment";
import { toast } from "react-toastify";

export const getAdminObserverActivities = async ()=>{
    try {
        attachToken()
        const res = await privateAPI.get("/dashboard/admin_observer_activities");
        console.log("res---->",res);
        if(res.status === 200){
            store.dispatch(setAdminObserver(res.data));
            return res;
        }
    } catch (error) {
        console.log("error",error);
    }
}

export const getAdminPartnerDownload = async ()=>{
    try {
        attachToken()
        const res = await privateAPI.get("/dashboard/admin_partner_downloads");
        console.log("res---->",res);
        if(res.status === 200){
            store.dispatch(setallUser(res.data.Observer));
        }
    } catch (error) {
        console.log("error",error);
    }
}

export const getAdminAuditLogs = async ()=>{
    try {
        attachToken()
        const res = await privateAPI.get("/dashboard/admin_audit_logs?offset=0&limit=50");
        console.log("Ress",res);
        if(res.status === 200){
            store.dispatch(setAdminAuditLogs(res.data));
            return res?.data
        }
    
    } catch (error) {
        console.log("error",error);
    }
}

export const getUser = async () => {
    try {
      attachToken()
        const res = await privateAPI.get("/users");
        if (res.status === 200) {
            store.dispatch(setallUser(res.data));
            return res.data; 
        }
    } catch (error) {
        console.log("error", error);
    }
    return [];
};

export const sendUserData = async (userData: any) => {
    try {
      attachToken();
      const res = await privateAPI.post("/add_new_user", userData);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.error("Error while sending user data:", error);
    }

    return [];
};
  
 export const deleteUser = async (id:any)=>{
    try {
        const res= await privateAPI.delete(`/users/${id}`);
        if(res.status === 200){
            getUser();
            return res;
        }
    } catch (error) {
        console.log("error",error);
    }
}
 export const updateUser = async (id: any, userData: any) => {
    try {
      attachToken();
      const res = await privateAPI.put(`/users/${id}`, userData); 
      if (res.status ===200) {
        console.log("User updated successfully:", res);
        getUser()
        return res.data;
      }
    } catch (error) {
      console.error("Error while updating user data:", error);
    }
  
    return null; 
  
};

export const getSurveys = async () => {
    try {
        attachToken();
        const res = await privateAPI.get("/surveys/surveys?skip=0&limit=20");
        if (res.status === 200) {
            console.log("res serveys",res);
            return res;
        } 
    } catch (error) {
        //@ts-ignore
        console.log("surveys error", error.response ? error.response.data : error.message);
    }
}

export const getRecentSurvey = async ()=>{
    try {
        attachToken();
        const res = await privateAPI.get("/dashboard/observer_previous_surveys");
        if(res.status === 200){
            store.dispatch(setPreviousServey(res.data));
            return res;
        }
    } catch (error) {
        console.log("error",error);
    }
}

export const getPartnerDownload = async ()=>{
    try {
        attachToken();
        const res = await privateAPI.get("/dashboard/admin_partner_downloads");
        if(res.status === 200){
            store.dispatch(setPartnerDownload(res.data));
            return res;
        }
    } catch (error) {
        //@ts-ignore
        console.log("error", error.response ? error.response.data : error.message);
    }
}

export const createServay = async(payload:any)=>{
    try {
        const res = await privateAPI.post("/surveys/surveys",payload);
        if(res.status === 200){
            return res;
        }else{
            console.log(res);
        }
    } catch (error) {
        console.log("error",error);
    }
}
export const creatServayPart = async(payload:any)=>{
    attachToken();
    try {
        const res = await privateAPI.post("/survey_part/surveyparts",payload);
        if(res.status === 200){
            return res;
        }else{
            console.log(res);
        }
    } catch (error) {
        console.log("error",error);
    }
}


export const updatedPassword = async (data:any,id:any)=>{
    try {
        const res = await privateAPI.put(`/users/${id}/change_passwd`,data);
        if(res.status === 200){
            toast.success("Updated Successfully");
            return res;
        }
    } catch (error) {
        console.log("error",error);
    }
}


