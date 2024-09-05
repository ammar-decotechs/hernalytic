'use client'

import Table from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { getAdminAuditLogs } from "@/redux/services/admin/admin";
import dayjs from 'dayjs';
import Link from "next/link";

export default function RecentLogs() {
  const [data, setData] = useState([]);

  const { adminAuditLogs } = useAppSelector(state => state.admin);

  const headerRows = ["S/N", "Log Message", "By", "Date", "Time"];
  const tableDataKeys = ["logMessage", "by", "date", "time"];

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdminAuditLogs();
        console.log("API Response:", res);

        const logs = Array.isArray(res) ? res : res.data;

        //@ts-ignore
        const latestLogs = logs.slice(0, 10).map(log => ({
          logMessage: `Details: ${log.route} (ID: ${log.id}) edited by user '${log.firstname} ${log.lastname}'`,
          by: `${log.firstname} ${log.lastname}`,
          date: dayjs(log.timestamp).format('MM/DD/YYYY'),
          time: dayjs(log.timestamp).format('h:mm a'),
        }));

        console.log("Formatted Logs:", latestLogs);
        setData(latestLogs);
      } catch (error) {
        console.error("API Error:", error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col mt-20">
      <div className="px-6 pt-4 pb-8 flex items-center justify-between border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]">
        <p className="text-[24px] text-primary-cDark1D font-semibold">
          Recent Logs
        </p>
        {
          adminAuditLogs.length > 10 &&

          <div className="flex gap-x-5 ">
            <Link href={'/admin/auditlogs/'}><p className="text-[16px] text-primary-cOrange00">See All</p></Link>
          </div>
        }

      </div>
      <div className="overflow-x-auto">
        <Table
          headerRows={headerRows}
          tableDataKeys={tableDataKeys}
          tableData={data}
        />
      </div>
    </div>
  );
}

