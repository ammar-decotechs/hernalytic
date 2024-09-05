import React from "react";

import Dropdown from "../../observer/drop-down";
import Table from "@/components/ui/table";

export default function AdminRecentActivities({headerRows, tableDataKeys, tableData}:any): React.ReactNode {
  return (
    <div className="flex flex-col">
      <div className="px-6 pt-4 pb-8 flex items-center justify-between border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]">
        <p className="text-[24px] text-primary-cDark1D font-semibold">
          Recent Activities
        </p>
        <div className="flex items-center">
          <p className="text-[16px] text-primary-cGrey7B">Sort By:</p>
          <Dropdown options={["Most Recent", "Date", "Time"]} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table
          headerRows={headerRows}
          tableDataKeys={tableDataKeys}
          tableData={tableData}
        />
      </div>
    </div>
  );
}
