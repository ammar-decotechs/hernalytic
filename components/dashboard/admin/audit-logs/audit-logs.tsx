"use client"
import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import AuditLogsData from "./audit-logs-data";
import PageHeader from "@/components/shared/page-header";
import dayjs from 'dayjs';
import { privateAPI } from "@/config/config";
import { getAdminAuditLogs } from "@/redux/services/admin/admin";

export default function AuditLogs() {

  const [data,setData] = useState([]);
  const headerRows = ["S/N", "Log Message", "By", "Date", "Time"];
  const tableDataKeys = ["logMessage", "by", "date", "time"];

  const activityTableData = [
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 200) edited by user ‘Jake doe",
      By: "Jake Does",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
    {
      logsmessage:
        "Creation of ‘User Account’ (ID: 234) edited by user ‘Jake doe",
      By: "Jake Doe",
      date: "8:14am",
      time: "11/04/20222",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdminAuditLogs();
        console.log("API Response:", res);

        const logs = Array.isArray(res) ? res : res.data;

        //@ts-ignore
        const latestLogs = logs.map(log => ({
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
    <>
      <Navbar />
      <div className="pt-5 pb-20 px-8 lg:px-20">
        <PageHeader
          title="Audit Logs"
          description="Manage your team members and their account permissions here"
          showRight={true}
        />

        <AuditLogsData
          headerRows={headerRows}
          tableData={data}
          tableDataKeys={tableDataKeys}
        />
      </div>
    </>
  );
}
