import React from "react";

import Dropdown from "../../observer/drop-down";
import Table from "@/components/ui/table-select-rows";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AllSurveys({
  headerRows,
  tableDataKeys,
  tableData,
  switchHandler
}: any): React.ReactNode {
  return (
    <div className="flex flex-col">
      <div className=" overflow-x-auto no_scrollbar border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]">
      <div className="px-6 pt-4 pb-8 flex items-center justify-between   border-primary-cGreyCA  min-w-[1100px]">
        <p className="text-[24px] text-primary-cDark1D font-semibold">
          All Surveys ({tableData?.length})
        </p>
        <div className="flex items-center gap-x-2">
          <div className="flex overflow-hidden rounded-[29px] px-6 items-center justify-center gap-3 border border-primary-cLightF1 w-[400px] bg-primary-cLightbgFD">
            <IoSearch />
            <input
              placeholder="Search User"
              className="w-full py-3 border-none outline-none bg-primary-cLightbgFD"
            />
          </div>
          <div className="flex items-center">
            <p className="text-[16px] text-primary-cGrey7B">Sort By:</p>
            <Dropdown options={["Most Recent", "Date", "Time"]} />
          </div>
          <Link  href="/admin/survey/createsurvey/">
          <Button  variant={"default"} className="px-5">CREATE NEW SURVEY</Button>
          </Link>
        </div>
      </div>
      </div>
      <div className="">
        <Table
          headerRows={headerRows}
          tableDataKeys={tableDataKeys}
          tableData={tableData}
        />
       
      </div>
    </div>
  );
}
