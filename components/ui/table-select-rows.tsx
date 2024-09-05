"use client";

import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import { Tag } from "@/components/ui/tag";
import { useVEOContext } from "@/providers/veo-context";

export default function Table({
  headerRows,
  tableDataKeys,
  tableData,
}: any): React.ReactNode {
  const [data, setData] = useState<any>(tableData);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  React.useEffect(() => {
    console.log("----- run useEffect -----")
    setData(tableData)
  },[tableData])

  const selectAllRowsHandler = () => {
    const booleanState = !selectAll;
    const updatedData = data?.map((item: any, i: any) => {
      return {
        ...item,
        check: booleanState,
      };
    });

    setData(updatedData);
    setSelectAll(booleanState);
  };

  // Function to toggle checkbox state
  const selectRowHandler = (index: number) => {
    const updatedData = data?.map((item: any, i: any) => {
      if (i == index) {
        return {
          ...item,
          check: !item?.check,
        }; // Toggle boolean value
      }
      return item;
    });

    setData(updatedData);

    // Check if any row is selected
    const selectedRows = updatedData?.filter(
      (item: any) => item?.check === true
    );
    if (selectedRows?.length === updatedData?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  console.log('users table data', data)

  return (
    <div className=" border border-b-none rounded-bl-[8px] rounded-br-[8px] border-primary-cGreyCA overflow-x-auto no_scrollbar">
    <table
      className="min-w-[900px]"
      // style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}
      style={{ width: "100%" }}
    >
      <thead>
        <tr className="text-center bg-[#F2FBFD] ">
          <th className="flex justify-center relative text-primary-cDark1D text-[16px] font-normal py-4">
            <div
              onClick={() => selectAllRowsHandler()}
              className="w-4 h-4 p-2 rounded-[2px] flex justify-center items-center border-2 border-primary-cDark1D cursor-pointer"
            >
              {selectAll ? "-" : "+"}
            </div>
          </th>
          {headerRows?.map((item: any, index: number) => (
            <th
              key={index}
              className="relative text-primary-cDark1D text-[16px] font-normal py-4"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="">
        {data?.map((item: any, index: number) => (
          <tr key={index} className={`text-center`}>
            <td
              className={`py-4 text-primary-cDark1D text-[16px] font-normal 
                   border-t border-t-primary-cGreyCA`}
            >
              <div className="flex justify-center">
                <div
                  onClick={() => selectRowHandler(index)}
                  className="w-4 h-4 p-2 rounded-[2px] flex justify-center items-center border-2 border-primary-cDark1D cursor-pointer"
                >
                  {item.check ? "+" : ""}
                </div>
              </div>
            </td>
            {tableDataKeys.map((identifier: string, index2: number) => (
              <td
                className={`py-3 text-primary-cDark1D text-[16px] font-normal border-t border-t-primary-cGreyCA `}
              >
                {item[identifier]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
