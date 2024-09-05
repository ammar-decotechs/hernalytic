import React from "react";

import Dropdown from "./drop-down";
import { surveyType } from "@/definitions/survey-types";
import Table from "@/components/ui/table";

export default function RecentActivities({
  headerRows,
  tableDataKeys,
  tableData,
}: {
  headerRows: string[];
  tableDataKeys: string[];
  tableData: surveyType[];
}): any {
  const dropOptions = ["Most Recent", "Date", "Time"];

  return (
    <div className="flex flex-col">
      <div className="px-6 pt-4 pb-8 flex items-center justify-between border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]">
        <p className="md:text-[24px] text-[16px] text-primary-cDark1D font-semibold">
          Recent Activities
        </p>
        <div className="flex items-center">
          <p className="md:text-[16px] text-[11px] text-primary-cGrey7B">Sort By:</p>
          <Dropdown options={dropOptions} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table headerRows={headerRows} tableDataKeys={tableDataKeys} tableData={tableData} />
      </div>
    </div>
  );
}
