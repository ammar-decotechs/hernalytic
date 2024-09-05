import React from "react";

import { FiDownload } from "react-icons/fi";

import AdminNav from "../navbar";
import AdminSurveyNav from "../survey-nav";
import Footer from "../footer";
import SurveyResults from "./survey-result";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const headerRows = [
  "S/N",
  "Survey",
  "",
  "Survey Status",
  "No of Submission",
  "",
];

const tableDataKeys = [
  "caption",
  "graph",
  "status",
  "no_of_submission",
  "download",
];

const tableData = [
  {
    caption: "Edo Governorship Election Survey",
    graph: (
      <Link href="/partner/survey/graphicalRepresentation/">
        <Button
          variant={"outline_2"}
          className="py-[8px] cursor-pointer rounded-[10px] text-[14px]"
        >
          GRAPHICAL REPRESENTATION
        </Button>
      </Link>

    ),
    status: <Tag variant={"complete"}>Downloaded</Tag>,
    no_of_submission: 100,
    download: (
      <Button variant={"outline"} className="px-10 py-[12px] cursor-pointer text-[14px] flex items-center gap-x-2">
        <FiDownload /> DOWNLOAD
      </Button>
    ),
  },
];

export default function SurveyAnalyze(): React.ReactNode {
  return (
    <>
      <AdminNav />

      <AdminSurveyNav />

      <div className="mt-10 pt-5 pb-20 px-8 lg:px-20">
        <SurveyResults
          headerRows={headerRows}
          tableDataKeys={tableDataKeys}
          tableData={tableData}
        />
      </div>

      <Footer />
    </>
  );
}
