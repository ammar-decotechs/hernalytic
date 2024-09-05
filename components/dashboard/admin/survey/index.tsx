"use client";

import React, { useEffect, useState } from "react";

import AdminNav from "../navbar";
import AdminSurveyNav from "../survey-nav";
import Footer from "../../observer/footer";
import AdminSurveyDescription from "./survey-description";
import AdminRecentActivities from "./recent-activities";
import AdminStartSurvey from "./start-survey";
import { recentSurveys } from "@/redux/interface/admin";
import { Tag } from "@/components/ui/tag";
import { getRecentSurvey } from "@/redux/services/admin/admin";

export default function Survey() {
  const [selectedSurvey, setSelectedSurvey] = useState<recentSurveys | null>(null);
  const [surveyData, setSurveyData] = useState<recentSurveys[]>([]);

  const fetchRecentSurveys = async () => {
    try {
      const res = await getRecentSurvey();
      setSurveyData(res?.data || []);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchRecentSurveys();
  }, []);

  const formatTime = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), Number(seconds));
  
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const recentActivities = surveyData?.map((survey) => ({
    Survey: survey.caption,
    survey_status: (
      //@ts-ignore
      <Tag variant={survey.published ? "complete" : "incomplete"}>
        {survey.published ? "Published" : "Not Published"}
      </Tag>
    ),
    date: new Date(survey.completion_date).toLocaleDateString(),
    time: formatTime(survey.completion_time),
  }));

  const tableDataKeys = ["Survey", "survey_status", "date", "time"];
  const headerRows = ["S/N", "Survey", "Survey Status", "Completion Date", "Completion Time"];

  return (
    <>
      <AdminNav />
      <AdminSurveyNav />

      <div className="mt-10 pt-5 pb-20 px-8 lg:px-20">
        {selectedSurvey ? (
          <>
            <p className="text-[26px] text-primary-cDark32 font-semibold">
              {selectedSurvey.caption}
            </p>
            <div className="md:mt-20 mt-10">
              <AdminStartSurvey />
            </div>
          </>
        ) : (
          <>
            {surveyData.length > 0 && (
              <AdminSurveyDescription
                data={surveyData[0]}
                setSelectedSurvey={setSelectedSurvey}
              />
            )}
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
