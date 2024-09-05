"use client"

import React from "react";

import { IoSearch } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import AddMultipleUser from "./add-multipleUser";
import AddSingleUser from "./add-user";
import { useVEOContext } from "@/providers/veo-context";
import Dropdown from "../../observer/drop-down";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table-select-rows";
import {setOpen} from "../../../../redux/slices/generalSlice";
import {setActiveModal} from "../../../../redux/slices/generalSlice";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
export default function UserManagementData({
  headerRows,
  tableDataKeys,
  tableData,
}: any): React.ReactNode {
  const { activeModal } = useAppSelector((state)=>state.general)
  console.log("activeModal", activeModal)
    // const {setSubmitConfirm} = useVEOContext()
    const dispatch = useAppDispatch();
  return (
    <div className="mt-20 flex flex-col">
      <div className="px-6 pt-4 pb-8 flex items-center justify-between border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]">
        <p className="text-[24px] text-primary-cDark1D font-semibold">
          All users ({tableData?.length})
        </p>
        <div className="flex itmes-center gap-x-3">
          <div className=" overflow-hidden hidden xl:flex rounded-[29px] px-6 items-center justify-center gap-3 border border-primary-cLightF1 w-[400px] bg-primary-cLightbgFD">
            <IoSearch />
            <input
              placeholder="Search User"
              className="w-full py-3 border-none outline-none bg-primary-cLightbgFD"
            />
          </div>

          <div className="flex items-center">
            <p className="text-[16px] text-primary-cGrey7B">Sort By:</p>
            <Dropdown
              options={["Observer", "Admin", "Partner", "Super-Admin"]}
            />
          </div>

          <Button
            className="py-[10px] md:text-[16px] text-[12px]  px-[15px] flex gap-x-2" 
            variant="outline"
            onClick={() => {
              dispatch(setActiveModal("add-multiple-user"))
              dispatch(setOpen(true))
            }}
          >
          <LuUploadCloud/>
          ADD MUTLITPLE USER
          </Button>
          <Button
            className="md:py-[10px] md:px-[15px] px-[10px] py-[7px] md:text-[16px] text-[12px]"
            onClick={() => {dispatch(setOpen(true))
               dispatch(setActiveModal("add-single-user"))
              }}
          >
         ADD SINGLE USER
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table
          headerRows={headerRows}
          tableDataKeys={tableDataKeys}
          tableData={tableData}
        />
      </div>


      {
       activeModal === "add-multiple-user" &&  <AddMultipleUser /> 
      }
      {activeModal === "add-single-user" &&  <AddSingleUser />} 
    
    </div>
  );
}
