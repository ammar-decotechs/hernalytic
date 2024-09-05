

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { useVEOContext } from "@/providers/veo-context";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { setActiveModal, setOpen } from "../../../../redux/slices/generalSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toast } from 'react-toastify';
import { sendUserData, updatedPassword, updateUser } from "@/redux/services/admin/admin";

export default function AddSingleUser({ updateUserid, onDeleteSuccess, setUpdateUserId, updatePasswrd, setUpdatePasswrd }: any) {
  const { submitConfirm, setSubmitConfirm } = useVEOContext();
  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.general);
  const [loading, setLoading] = useState(false);
  const [load,setLoad] = useState(false);
  const [userData, setUserData] = useState<any>({
    userId: "",
    role: "observer",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
    is_admin: false,
    is_sub_admin: false,
  });

  useEffect(() => {
    if (updateUserid) {
      setUserData({
        ...userData,
        userId: updateUserid.id,
        role: updateUserid.role,
        firstName: updateUserid.firstname,
        lastName: updateUserid.lastname,
        email: updateUserid.email,
        mobileNumber: updateUserid.phone,
        dateOfBirth: updateUserid.dateOfBirth,
        gender: updateUserid.gender,
        is_admin: updateUserid.is_admin,
        is_sub_admin: updateUserid.is_sub_admin,
      });
    }

    // if(updatePasswrd){
    //   password: updatePasswrd?.psswored,
    //   confirmPassword: "",
    // }
  }, [updateUserid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, } = e.target;
    setUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateUserData = (data: any, isUpdate: boolean) => {
    const requiredFields = isUpdate
      ? ['firstName', 'lastName', 'gender', 'mobileNumber']
      : ['firstName', 'lastName', 'email', 'mobileNumber', 'dateOfBirth', 'gender', 'password', 'confirmPassword'];

    for (let field of requiredFields) {
      if (!data[field]) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1')} is required.`);
        return false;
      }
    }

    if (!isUpdate && data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleUserAction = async () => {
    console.log("User data: ", userData);
    setLoading(true);



    if (updateUserid) {
      if (!validateUserData(userData, true)) {
        setLoading(false);
        return;
      }
      try {
        const response = await updateUser(updateUserid.id, {
          firstname: userData.firstName,
          lastname: userData.lastName,
          gender: userData.gender,
          phone: userData.mobileNumber,
        });
        if (response) {
          console.log("User updated successfully:");
          toast.success("User updated successfully");
          onDeleteSuccess();
          dispatch(setOpen(false));
          setUpdateUserId(null);
          setUserData(null);

        }
      } catch (error: any) {
        console.error("Error updating user:", error);
        toast.error(error.message);
        toast.error("Failed to update user");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        if (!validateUserData(userData, false)) {
          setLoading(false);
          return;
        }
        const response = await sendUserData(userData);
        if (response) {
          onDeleteSuccess();
          toast.success("User created successfully");
          setUserData(null);
          dispatch(setOpen(false));

        }

      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Failed to create user");
      } finally {
        setLoading(false);
      }
    }
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    if (!password || !confirmPassword) {
      toast.error("Password and Confirm Password are required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const updatePassword = async () => {
    setLoad(true);
    if (!validatePassword(userData.password, userData.confirmPassword)) {
      setLoad(true);
      return;
    }

    try {
      const data = {
        password: userData.password,
        confirm_password: userData.confirmPassword
      };
      const res = await updatedPassword(data,updatePasswrd);
      if (res) {
        onDeleteSuccess();
        dispatch(setOpen(false));
        setUpdateUserId(null);
        setUserData(null);
        setLoad(true);
        setUpdatePasswrd(null);
      }
    } catch (error) {
      console.log("error", error);
      setLoad(true);
    }
  };

  return (
    <Modal>
      <div className="w-full px-3 py-2">
        <div className="w-full px-3 py-2 flex justify-between mb-5">
          <p className="text-[24px] font-[400] text-primary-cBlue73">
            {updateUserid ? "Update User Information" : "Add User Information"}
          </p>
          <IoClose
            className="cursor-pointer"
            onClick={() => {
              dispatch(setOpen(false));
              dispatch(setActiveModal(null));
              setUpdateUserId(null);
              setUpdatePasswrd(null);
              setUserData(null)
            }}
          />
        </div>

        <div className="w-full px-3 py-2 grid grid-cols-4 gap-x-4 gap-y-6">
          {/* User ID */}
          {
            updateUserid &&
            !updatePasswrd &&
            <div className="col-span-2 ">
              <label className="text-[16px] font-[500]">User ID*</label>
              <input
                name="userId"
                value={userData?.userId}
                onChange={handleChange}
                placeholder="#234"
                disabled={!!updateUserid}
                className="px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full"
              />
            </div>
          }

          {/* First Name */}
          {
            !updatePasswrd
            &&
            <div className="col-span-2">
              <label className={` ${updateUserid && "disabled"}text-[16px] font-[500]`}>First Name*</label>
              <input
                name="firstName"
                value={userData?.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full"
              />
            </div>

          }

          {/* Last Name */}
          {
            !updatePasswrd
            &&
            <div className="col-span-2">
              <label className="text-[16px] font-[500]">Last Name*</label>
              <input
                name="lastName"
                value={userData?.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full"
              />
            </div>
          }

          {/* Role */}
          {
            !updatePasswrd
            &&

            <div className="col-span-2">
              <label className="text-[16px] font-[500]">Role</label>
              <select
                name="role"
                value={userData?.role}
                onChange={handleChange}
                disabled={!!updateUserid}
                className={`px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full`}
              >
                <option value="observer">Observer</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          }
          {
            !updatePasswrd
            &&
            <div className="col-span-2">
              <label className="text-[16px] font-[500]">Email*</label>
              <input
                type="email"
                name="email"
                value={userData?.email}
                onChange={handleChange}
                placeholder="Email"
                disabled={!!updateUserid}
                className="px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full"
              />
            </div>
          }



          {/* Mobile Number */}
          {
            !updatePasswrd &&
            <div className="col-span-2">
              <label className="text-[16px] font-[500]">Mobile Number*</label>
              <input
                type="tel"
                name="mobileNumber"
                value={userData?.mobileNumber}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full"
              />
            </div>
          }


          {/* Date of Birth */}
          {
            !updatePasswrd &&
            <div className="col-span-2">
              <label className="text-[16px] font-[500]">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={userData?.dateOfBirth}
                onChange={handleChange}
                disabled={!!updateUserid}
                className="px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full"
              />
            </div>
          }

          {/* Gender */}
          {
            !updatePasswrd
            &&
            <div className="col-span-2">
              <label className="text-[16px] font-[500]">Gender</label>
              <select
                name="gender"
                value={userData?.gender}
                onChange={handleChange}
                className="px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          }

          {/* Password */}

          {
            !updateUserid &&
            <div className="col-span-2">
              <label className="text-[16px] font-[500]">Password*</label>
              <input
                type="password"
                name="password"
                value={userData?.password}
                onChange={handleChange}
                placeholder="Password"
                className="px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full"
              />
            </div>
          }


          {/* Confirm Password */}

          {
            !updateUserid &&

            <div className="col-span-2">
              <label className="text-[16px] font-[500]">Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                value={userData?.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="px-3 py-2 rounded-[8px] border border-primary-cGrey92 outline-none w-full"
              />
            </div>
          }




        </div>

        <div className="w-full px-3 py-2 flex justify-end gap-x-4 mt-5">
          <Button className="py-1 px-5" variant="outline"
            onClick={() => {
              dispatch(setOpen(false));
              setUpdateUserId(null);
              setUserData(null);
              setUpdatePasswrd(null);
            }}>
            Cancel
          </Button>
          {
            !updatePasswrd &&
            <Button className={`py-1 px-3 ${loading ? ' opacity-50 cursor-not-allowed' : ''} `} onClick={handleUserAction}>
              {loading ? (<span className="load" />) : (updateUserid ? "Update User" : "Add User")}

            </Button>
          }
          {
            updatePasswrd &&
            <Button className={`py-1 px-3 ${load?' opacity-50 cursor-not-allowed ':''}`} onClick={() => { updatePassword() }}>
             {load?<span className="load" />:"Reset Password"} 
            </Button>
          }

        </div>
      </div>
    </Modal>
  );
}
