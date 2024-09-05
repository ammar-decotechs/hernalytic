"use client";

import { CiEdit } from "react-icons/ci";
import Navbar from "../navbar";
import Footer from "../footer";
import {useEffect} from "react"
import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";
import { useVEOContext } from "@/providers/veo-context";
import PageHeader from "@/components/shared/page-header";
import AddUser from "./add-user";
import UserManagementData from "./usermanagement-data";

interface User {
  name: any;
  role: any;
  create: any;
  check: any;
  button?: any;
}

export default function UserMangement() {

 


  const { setSubmitConfirm } = useVEOContext();

  const initialData: any = [
    {
      name: (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <span className="text-[16px] font-[500]">Jake Doe</span>
            <span className="text-[14px] font-[400]">johndoe@gmail.com</span>
          </div>
        </div>
      ),
      button: (
        <Button
          className="px-4 py-2 rounded-[6px] text-primary-cBlue73 border border-primary-cBlue73 font-[600] text-[13px]"
          variant={"outline"}
        >
          RESET PASSWORD
        </Button>
      ),
      role: "admin",
      create: "11/04/2022",
      action: (
        <div className="col-span-1 w-full flex justify-center items-center gap-5">
          <CiEdit className="text-primary-icongrayE0 cursor-pointer" />
          <MdDeleteOutline className="text-primary-icongrayE0 cursor-pointer" />
        </div>
      ),
      check: false,
    },
    {
      name: (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <span className="text-[16px] font-[500]">Jake Doe</span>
            <span className="text-[14px] font-[400]">johndoe@gmail.com</span>
          </div>
        </div>
      ),
      button: (
        <Button
          className="px-4 py-2 rounded-[6px] text-primary-cBlue73 border border-primary-cBlue73 font-[600] text-[13px]"
          variant={"outline"}
        >
          RESET PASSWORD
        </Button>
      ),
      role: "admin",
      create: "11/04/2022",
      action: (
        <div className="col-span-1 w-full flex justify-center items-center gap-5">
          <CiEdit className="text-primary-icongrayE0 cursor-pointer" />
          <MdDeleteOutline className="text-primary-icongrayE0 cursor-pointer" />
        </div>
      ),
      check: false,
    },
  ];

  const activityHeaderRows = ["Name", "", "Role", "Create", "Action"];

  const tableDataKey = ["name", "button", "role", "create", "action"];





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

        {/* Table Component */}
        <UserManagementData
          headerRows={activityHeaderRows}
          tableDataKeys={tableDataKey}
          tableData={initialData}
        />
      </div>
      <Footer />
      <AddUser />
    </>
  );
}
