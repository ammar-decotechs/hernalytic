import { store } from "@/redux/store";
import { profleDetailFormValues } from "./../../definitions/profile-form-schemas";
import { attachToken, privateAPI, publicAPI } from "@/config/config";
import { updateUser } from "@/redux/slices/userSlice";

interface login_payload {
  email: string;
  password: string;
}

interface change_password_payload {
  password: string;
  confirm_password: string;
}

export const login = async (
  payload: login_payload,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res = await publicAPI.post("/login", payload);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("name", `${res.data.firstname} ${res.data.lastname}`);
      attachToken();
      return res;
    }
  } catch (err) {
    setLoading(false);
    console.log("error", err);
  }
};

export const changePassword = async (
  payload: change_password_payload,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    attachToken()
    const res = await privateAPI.post("/change_passwd", payload);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    setLoading(false);
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

export const updateProfile = async (values: {
  values: any;
}) => {
  try {
    attachToken();
    const res = await privateAPI.put("/profile", values);
    if (res.status === 200) {
      await getProfile()
      return res;
    }
  } catch (err) {
    console.log("error", err);
  }
};
