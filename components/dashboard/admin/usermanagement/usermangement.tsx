"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Navbar from "../navbar";
import Footer from "../footer";
import PageHeader from "@/components/shared/page-header";
import AddSingleUser from "./add-user";
import UserManagementData from "./usermanagement-data";
import { RootState } from "@/redux/store";
import { getUser } from "@/redux/services/admin/admin";
import { setallUser } from "@/redux/slices/userManagment";
import DeleteModal from "../../deleteModal";
import { setActiveModal } from "../../../../redux/slices/generalSlice";
const activityHeaderRows = ["Name", "", "Role", "Create", "Action"];
const tableDataKeys = ["name", "button", "role", "create", "action"];
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setOpen } from "../../../../redux/slices/generalSlice";
export default function UserManagement() {
  const dispatch = useDispatch();
  const { activeModal } = useAppSelector((state) => state.general)
  console.log("active modal", activeModal)
  const [userData, setUserdata] = useState<any[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [updateUserId, setUpdateUserId] = useState<any>(null);
  const [updatePasswrd, setUpdatePasswrd] = useState<any>(null);
  const [modalOpen, SetModalOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true); 



  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      if (userData) {
        dispatch(setallUser(userData));

        const tempdata = userData.map((user: any) => ({
          name: (
            <div className="flex flex-col items-center">
              <span className="text-[16px] font-[500]">{user.firstname}{user.lastname}</span>
              <span className="text-[14px] font-[400]">{user.email}</span>
            </div>
          ),
          button: (
            <Button
              onClick={() => {
                dispatch(setActiveModal("password-user"))
                console.log("password obj", user)
                setUpdatePasswrd(user?.id);
                dispatch(setOpen(true))
              }}
              className="px-4 py-2 rounded-[6px] text-primary-cBlue73 border border-primary-cBlue73 font-[600] text-[13px]"
              variant={"outline"}
            >
              RESET PASSWORD
            </Button>
          ),
          role: user.role,
          create: user.createdAt,
          action: (
            <div className="col-span-1 w-full flex justify-center items-center gap-5">
              <CiEdit className="text-[#006874] text-[22px] cursor-pointer"
                onClick={() => {
                  dispatch(setActiveModal("update-user"));

                  setUpdateUserId(user);
                  dispatch(setOpen(true))
                }} />
              <MdDeleteOutline onClick={() => { SetModalOpen(true); setUserId(user.id) }} className="text-red-500 text-[20px] cursor-pointer" />
            </div>
          ),
          check: false,
        }));


        setUserdata(tempdata);
      }
    };

    if (shouldFetch) {
      fetchUserData();
      setShouldFetch(false);
    }
    // fetchUserData();
  }, [dispatch,shouldFetch]);

  const handleDeleteSuccess = () => {
    setShouldFetch(true); 
  };

  return (
    <>
      <Navbar />
      <div className="pt-5 pb-20 px-8 lg:px-20">
        {/* Header */}
        <PageHeader
          title="User management"
          description="Manage your team members and their account permissions here"
          showRight={true}
        />
        <DeleteModal modalOpen={modalOpen} id={userId} setModalOpen={SetModalOpen} onDeleteSuccess={handleDeleteSuccess}  />
        {/* Table Component */}
        <UserManagementData
          headerRows={activityHeaderRows}
          tableDataKeys={tableDataKeys}
          tableData={userData}
        />

        <AddSingleUser updateUserid={updateUserId} setUpdateUserId={setUpdateUserId} onDeleteSuccess={handleDeleteSuccess} updatePasswrd={updatePasswrd} setUpdatePasswrd={setUpdatePasswrd} />
      </div>
      <Footer />

    </>
  );
}
