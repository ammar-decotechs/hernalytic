"use client"
import React from "react";

import { IoSearch } from "react-icons/io5";
import SwitchToggle from "@/components/ui/switch";
import { useVEOContext } from "@/providers/veo-context";
import Dropdown from "../../observer/drop-down";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import Table from "@/components/ui/table-select-rows";

export default function AllResults() {
  const headerRows = [ "Results", " ", "Create Date",  "Action"];

  const tableDataKeys = ["Results", "switch", "CreateDate", "Action",];

  const data = [
    {
        Results:"Edo Governorship Election Result",
        
        switch: <div className=" flex justify-end w-full"><SwitchToggle  id={1} defaultValue={true} switchHandler={switchToggleHandler}/></div>,
   
      CreateDate: "11/04/20222",
      Action:  (
        <div className="col-span-1 w-full flex justify-center items-center gap-5">
          <CiEdit className="text-primary-icongrayE0 cursor-pointer" />
          <MdDeleteOutline className="text-primary-icongrayE0 cursor-pointer" />
        </div>
      ),
    },
    {
        Results:"Edo Governorship Election Result",
        switch: <div className=" flex justify-end w-full"><SwitchToggle  id={2} defaultValue={true} switchHandler={switchToggleHandler}/></div>,
  
      CreateDate: "11/04/20222",
      Action:  (
        <div className="col-span-1 w-full flex justify-center items-center gap-5">
          <CiEdit className="text-primary-icongrayE0 cursor-pointer" />
          <MdDeleteOutline className="text-primary-icongrayE0 cursor-pointer" />
        </div>
      ),
    },
    {
        Results:"Edo Governorship Election Result",
        switch: <div className=" flex justify-end w-full"><SwitchToggle  id={3} defaultValue={true} switchHandler={switchToggleHandler}/></div>,
  
      CreateDate: "11/04/20222",
      Action:  (
        <div className="col-span-1 w-full flex justify-center items-center gap-5">
          <CiEdit className="text-primary-icongrayE0 cursor-pointer" />
          <MdDeleteOutline className="text-primary-icongrayE0 cursor-pointer" />
        </div>
      ),
    },
    
   
  ];

  function switchToggleHandler (id:number, value:boolean) {
    console.log('switch handlers', id, value)
    // const updatedArr = tableData?.map((item) => {
    //   if(item?.id == id){
    //     return {
    //       ...item, toggle: value
    //     }
    //     }  else {
    //     return item
    //   }
    // })

    const filteredArr = data?.filter((item) => item?.switch.props.id !== id);
    const filteredObj = data?.filter((item) => item?.switch.props.id === id)?.[0];

    const updatedArr = [...filteredArr, {...filteredObj, toggle: value}]

    console.log('updatedArr', updatedArr)
  }



  return (
    <div className="flex flex-col mt-20">
        <div className=" border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]  overflow-x-auto no_scrollbar">
            <div className="min-w-[900px] px-6 pt-4 pb-8 flex items-center justify-between ">
        <p className="text-[24px] text-primary-cDark1D font-semibold">
        All Results (100)
           {/* ({tableData?.length}) */}
        </p>
        <div className="flex itmes-center gap-x-3">
          <div className="flex overflow-hidden  rounded-[29px] px-6 items-center justify-center gap-3 border border-primary-cLightF1 w-[400px] bg-primary-cLightbgFD">
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
          </div>
        </div>
      </div>
      <div className="">
        <Table
          headerRows={headerRows}
          tableDataKeys={tableDataKeys}
          tableData={data}
        />
      </div>
    </div>
  );
}
