import { attachToken, privateAPI, publicAPI } from "@/config/config";
import { store } from "../store";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { setLoading } from "../slices/authSlice";
import { updateUser } from "../slices/userSlice";

interface login_payload {
  email: string;
  password: string;
}

interface change_password_payload {
  password: string;
  confirm_password: string;
}

export const login = async (payload: any) => {
  try {
    store.dispatch(setLoading(true));
    const res = await publicAPI.post("/login", payload);
    if (res.status === 200) {
      Cookies.set("token", res.data.access_token, { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set("user_role", res.data.role, { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set("name", `${res.data.firstname} ${res.data.lastname}`, { expires: 7, secure: true, sameSite: 'Strict' });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem(
        "name",
        `${res.data.firstname} ${res.data.lastname}`
      );
      localStorage.setItem("user_role", res?.data?.role);
      store.dispatch(updateUser(res?.data));
      store.dispatch(setLoading(false));
      attachToken();
      toast.success("Login Successfully")
      return res;
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.detail)
    store.dispatch(setLoading(false));
    console.log("error", err);
  }
};

export const changePassword = async (payload: change_password_payload) => {
  try {
    store.dispatch(setLoading(true));
    attachToken();
    const res = await privateAPI.post("/change_passwd", payload);
    if (res.status === 200) {
      store.dispatch(setLoading(false));
      return res;
    }
  } catch (err) {
    store.dispatch(setLoading(false));
    console.log("error", err);
  }
};

export const getProfile = async () => {
  try {
    attachToken();
    const res = await privateAPI.get("/profile");
    if (res.status === 200) {
      store.dispatch(updateUser(res?.data));
      return res?.data;
    }
  } catch (err) {
    console.log("error", err);
  }
};

export const updateProfile = async (values: any) => {
  try {
    attachToken();
    const res = await privateAPI.put("/profile", values);
    if (res.status === 200) {
      await getProfile();
      return res;
    }
  } catch (err) {
    console.log("error", err);
  }
};
