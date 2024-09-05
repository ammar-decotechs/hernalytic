"use client"

import React, { useEffect, useState } from "react";

import AdminNav from "../navbar";
import AdminSurveyNav from "../survey-nav";
import Footer from "../../observer/footer";
import AllSurveys from "./all-surveys";
import { Tag } from "@/components/ui/tag";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import dayjs from "dayjs";
import SwitchToggle from "@/components/ui/switch";
import { getSurveys } from "@/redux/services/admin/admin";
import { survey } from "@/redux/interface/admin";
const headerRows = [
  "Survey Title",
  "",
  "Create Date",
  "Status",
  "Response Received",
  "Action",
];

const tableDataKey = ["title", "switch", "date", "status", "response", "action"];

export default function ManageSurveys(): React.ReactNode {

  const [data, setData] = useState([]);

  const initialData = [
    {
      id: 1,
      title: "Edo Governorship Election Survey",
      switch: <SwitchToggle id={1} defaultValue={true} switchHandler={switchToggleHandler} />,
      status: <Tag variant={"complete"}>Completed</Tag>,
      date: "2 minute ago",
      response: 80,
      action: (
        <div className="col-span-1 w-full flex justify-center items-center gap-5">
          <CiEdit className="text-primary-icongrayE0 cursor-pointer" />
          <MdDeleteOutline className="text-primary-icongrayE0 cursor-pointer" />
        </div>
      ),
      toggle: true
    },
    {
      id: 2,
      title: "Edo Governorship Election Survey",
      switch: <SwitchToggle id={2} defaultValue={false} switchHandler={switchToggleHandler} />,
      status: <Tag variant={"complete"}>Completed</Tag>,
      date: "2 minute ago",
      response: 80,
      action: (
        <div className="col-span-1 w-full flex justify-center items-center gap-5">
          <CiEdit className="text-primary-icongrayE0 cursor-pointer" />
          <MdDeleteOutline className="text-primary-icongrayE0 cursor-pointer" />
        </div>
      ),
      toggle: false
    },
  ];

  const [tableData, setTableData] = React.useState(initialData);

  function switchToggleHandler(id: number, value: boolean) {


    const filteredArr = tableData?.filter((item) => item?.id !== id)

    const filteredObj = tableData?.filter((item) => item?.id == id)?.[0]

    const updatedArr = [...filteredArr, { ...filteredObj, toggle: value }]

  }
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await getSurveys();
        const formedData = res?.data.map((item: survey) => ({
          id: item.id,
          title: item.caption,
          switch: <SwitchToggle id={item.id} defaultValue={item.published} switchHandler={switchToggleHandler} />,
          status: item.published ? <Tag variant={"complete"}>Completed</Tag> : <Tag variant={"pending"}>Pending</Tag>,
          date: dayjs(item.completion_date).format('MMMM DD, YYYY'),
          response: 80, 
          action: (
            <div className="col-span-1 w-full flex justify-center items-center gap-5">
              <CiEdit className="text-primary-icongrayE0 cursor-pointer" />
              <MdDeleteOutline className="text-primary-icongrayE0 cursor-pointer" />
            </div>
          ),
          toggle: item.published
        }));

       console.log("formData",formedData);
        setData(formedData);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchSurveys();
  }, []);

  console.log("data",data);
  return (
    <>
      <AdminNav />

      <AdminSurveyNav />

      <div className="mt-10 pt-5 pb-20 px-8 lg:px-20">
        <AllSurveys
          headerRows={headerRows}
          tableDataKeys={tableDataKey}
          tableData={data}
          switchHandler={switchToggleHandler}
        />
      </div>

      <Footer />
    </>
  );
}
