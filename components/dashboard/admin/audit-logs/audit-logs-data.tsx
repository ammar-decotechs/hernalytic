import React from "react";

import { MdOutlineFileDownload } from "react-icons/md";

import Dropdown from "../../observer/drop-down";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";

export default function AuditLogsData({
  headerRows,
  tableData,
  tableDataKeys,
}: {
  headerRows: string[];
  tableData: any;
  tableDataKeys: any;
}): any {
  return (
    <div className="flex flex-col mt-20">
      <div className="px-6 pt-4 pb-8 flex items-center justify-between border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]">
        <p className="text-[24px] text-primary-cDark1D font-semibold">
          Audit Logs ({tableData?.length})
        </p>
        <div className="flex gap-x-5 ">
          <Button variant="outline" className="px-4 py-2 flex gap-x-3 ">
            <MdOutlineFileDownload className="text-[20px]" /> Export
          </Button>
          <div className="flex items-center">
            <p className="text-[16px] text-primary-cGrey7B">Sort By:</p>
            <Dropdown options={["Most Recent", "Date", "Time"]} />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table
          headerRows={headerRows}
          tableData={tableData}
          tableDataKeys={tableDataKeys}
        />
      </div>
    </div>
  );
}
