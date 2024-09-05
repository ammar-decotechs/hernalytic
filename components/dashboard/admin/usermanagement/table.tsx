"use client";

import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import { Tag } from "@/components/ui/tag";
import { useVEOContext } from "@/providers/veo-context";
import AddUser from "./add-user"

// Define the user type


export default function Table({initialData ,tableDataKey, activityHeaderRows}:any) {
  interface User {
    name: string;
    email: string;
    role: string;
    create: string;
    check: boolean;
  }

  console.log('activityHeaderRows', activityHeaderRows)

  const { submitConfirm, setSubmitConfirm } = useVEOContext();  
  const [users, setUsers] = useState<any>(initialData);

  console.log("userdata", users)
  // console.log("userdata",initialData)

  // Function to toggle checkbox state
  const handleCheckChange = (index: number) => {
    const updatedUsers = users?.map((user:any, i:any) => {
      if (i == index) {
        return { ...user, check: {...user?.check ,value: !user?.check?.value} }; // Toggle boolean value
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <>
    <div className="pt-4 pb-8 border-t mt-10 border-r border-l border-primary-cLightF1 rounded-[8px] no_scrollbar overflow-x-auto">
      <div className="lg:w-full w-[1100px]">
        <div className="flex items-center px-6 pb-4 py-2 justify-between border-b border-primary-cLightF1">
          <p className="text-[20px] text-[600] text-primary-cDark1D font-semibold">All users (100)</p>

          <div className="flex items-center gap-2">
            <div className="flex">
              <div className="flex overflow-hidden rounded-[29px] px-6 items-center justify-center gap-3 border border-primary-cLightF1 w-[400px] bg-primary-cLightbgFD">
                <IoSearch />
                <input
                  placeholder="Search User"
                  className="w-full py-3 border-none outline-none bg-primary-cLightbgFD"
                />
              </div>
            </div>
            <Button className="py-[10px] px-[15px]" onClick={()=>setSubmitConfirm(true)}>ADD USER</Button>
          </div>
        </div>

        <div className="grid grid-cols-10 px-6 text-primary-cDark1D bg-primary-theadingBgFD text-[16px] font-[400] py-4">
         {activityHeaderRows?.map((item:any)=>(
            <div className={`col_span_class col-span-${item.colspan}`}>
                {item.value}
            </div>
          ))
         }
        </div>

        {users?.map((row:any, index:number) => (
          <div key={index} className="grid px-6 grid-cols-10 items-center text-primary-cDark1D text-[16px] font-[400] py-4">

              <div className="col-span-1">
              <div
                className="w-4 h-4 p-2 rounded-[2px] flex justify-center items-center border-2 border-primary-cDark1D cursor-pointer"
                onClick={() => handleCheckChange(index)}
                >
                <input
                  type="checkbox"
                  checked={row?.check?.value}
                  onChange={() => handleCheckChange(index)}
                  className="hidden"
                />
                <div>{row.check?.value ? "+" : ""}</div>
              </div>
            </div>

            {
              tableDataKey?.map((identifier:any) => ( 
                <div className={`col-span-${row[identifier]?.colspan ? row[identifier]?.colspan : 1} flex justify-between`}>
                    {row[identifier]?.value}
            </div>
              ))
            }

            {/* <div className="col-span-1">
              <div
                className="w-4 h-4 p-2 rounded-[2px] flex justify-center items-center border-2 border-primary-cDark1D cursor-pointer"
                onClick={() => handleCheckChange(index)}
                >
                <input
                  type="checkbox"
                  checked={user.check}
                  onChange={() => handleCheckChange(index)}
                  className="hidden"
                />
                <div>{user.check ? "+" : ""}</div>
              </div>
            </div>

            <div className="col-span-5 flex justify-between">
              <div className="flex flex-col">
                <div className="text-[16px] font-[500]">{user.name}</div>
                <p className="text-[14px] font-[400]">{user.email}</p>
              </div>
              <Button className="px-4 py-2 rounded-[6px] text-primary-cBlue73 border border-primary-cBlue73 font-[600] text-[13px]" variant="outline">
                RESET PASSWORD
              </Button>
            </div>

            <div className="col-span-2 w-full flex justify-center rounded-[2px]">
              <div className="mt-2">
                <Tag>{user.role}</Tag>
              </div>
            </div>

            <div className="col-span-2 w-full text-end">{user.create}</div>

            <div className="col-span-1 w-full flex justify-center items-center gap-5">
              <CiEdit className="text-primary-icongrayE0 cursor-pointer" />
              <MdDeleteOutline className="text-primary-icongrayE0 cursor-pointer" />
            </div> */}
          </div>
        ))}
      </div>
    </div>

    <AddUser/>
        </>
  );
}
