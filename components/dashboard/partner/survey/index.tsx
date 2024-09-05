
// import React from 'react'
// import PartnerNav from "../navbar";
// import PartnerSurveyNav from "../survey-nav";
// export default  function Survey() {
//   return (

//     <div>
//   <PartnerNav />
//   <PartnerSurveyNav/>
//    survey
//       </div>
//   )
// }


"use client";

import React from "react";

import AdminNav from "../navbar";
import AdminSurveyNav from "../survey-nav";
import Footer from "../../observer/footer";
import AdminSurveyDescription from "./survey-description";
import AdminRecentActivities from "./recent-activities";
import AdminStartSurvey from "./start-survey";
import { Tag } from "@/components/ui/tag";

const surveyDesc = {
  id: 1,
  caption: "Edo Governorship Election Survey",
  description: "",
  survey_status: "Not Started",
  completion_date: "21/01/2024",
  completion_time: "21/01/2024",
  published: false,
};

const recentActivities = [
  {
    caption: "Edo Governorship Election Survey",
    survey_status: <Tag variant={"complete"}>Submitted</Tag>,
    date: "21/01/2024",
    time: "9:00am",
  },
];

const tableDataKeys = ["caption", "survey_status", "date", "time"];

const headerRows = ["S/N", "Survey", "Survey Status", "Date", "Time"];

export default function Survey() {
  const [selectedSurvey, setSelectedSurvey] = React.useState<any>(null);
  return (
    <>
      <AdminNav />

      <AdminSurveyNav />

      <div className="mt-10 pt-5 pb-20 px-8 lg:px-20">
        {selectedSurvey && (
          <p className="text-[26px] text-primary-cDark32 font-semibold">
            {selectedSurvey?.caption}
          </p>
        )}

        {selectedSurvey && (
          <div className="md:mt-20 mt-10">
            <AdminStartSurvey />
          </div>
        )}

        {!selectedSurvey && (
          <>
            <AdminSurveyDescription
              data={surveyDesc}
              setSelectedSurvey={setSelectedSurvey}
            />

            <div className="mt-10">
              <AdminRecentActivities
                headerRows={headerRows}
                tableDataKeys={tableDataKeys}
                tableData={recentActivities}
              />
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
