"use client";

import React, { useEffect, useState } from "react";
import { useVEOContext } from "@/providers/veo-context";
import moment from "moment";

import SurveyDescription from "./survey-description";
import RecentActivities from "./recent-activities";
import { Tag } from "@/components/ui/tag";
import StartSurvey from "./start-survey";
import { getDashboardObserver, getPreviousSurveys } from "@/services/observer";
import { SurveyType } from "@/definitions/survey-types";
import PageHeader from "@/components/shared/page-header";

// const surveyDescription = {
//   survey: "NWTF/ ElectHER E–Day Questionnaire for Observers",
//   description:
//     "Lorem ipsum dolor sit amet consectetur. In amet neque hendrerit donec in turpis scelerisque tempor. Bibendum neque purus porta ut amet ullamcorper sed quam tincidunt. Arcu luctus vestibulum consequat velit nisi vitae. Lacus proin tristique mauris dignissim amet potenti.Lorem ipsum dolor sit amet consectetur. In amet neque hendrerit donec in turpis scelerisque tempor. Bibendum neque purus porta ut amet ullamcorper sed quam tincidunt. Arcu luctus vestibulum consequat velit nisi vitae. Lacus proin tristique mauris dignissim amet potenti.Lorem ipsum dolor sit amet consectetur. In amet neque hendrerit donec in turpis scelerisque tempor. Bibendum neque purus porta ut amet ullamcorper sed quam tincidunt. Arcu luctus vestibulum consequat velit nisi vitae. Lacus proin tristique mauris dignissim amet potenti.",
//   date: "21/01/2024",
//   time: "8:00am",
//   unitName: "Lorem ipsum dolor sit amet consectetur.",
//   unitAddress: "Lorem ipsum dolor sit amet consectetur.",
// };

const activityHeaderRows = [
  "S/N",
  "Survey",
  "Survey status",
  "Date",
  "Time Taken",
];

const tableDataKeys = ["survey", "status", "date", "time"];

export default function ObserverHome() {
  const { selectedSurvey, setSelectedSurvey } = useVEOContext();
  const [surveys, setSurveys] = useState<Array<SurveyType>>([]);
  const [previousSurveys, setPreviousSurveys] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const localName =
  //   typeof window !== "undefined" && localStorage.getItem("name");

  useEffect(() => {
    getData();
    getSurveys();
  }, []);

  const getData = async () => {
    !loading && setLoading(true);
    const res = await getDashboardObserver();
    if (res) {
      setSurveys(res);
    }
    setLoading(false);
  };

  const getSurveys = async () => {
    const getSurveys = async () => {
      const res = await getPreviousSurveys();
      if (res) {
        let tempSurveys: any = [];
        res?.map((item: SurveyType) =>
          tempSurveys.push({
            survey: (
              <span
              // className="cursor-pointer"
              // onClick={() => setShowSurvey(true)}
              >
                {item?.caption}
              </span>
            ),
            status: (
              <Tag
                variant={
                  item?.survey_status == "Incomplete"
                    ? "danger"
                    : item?.survey_status == "Completed"
                    ? "complete"
                    : "pending"
                }
              >
                {item?.survey_status}
              </Tag>
            ),
            date: moment(item?.completion_date).format("DD/MM/YYYY"),
            time: moment(item?.completion_date).format("hh:mm"),
          })
        );

        setPreviousSurveys(tempSurveys);
      }
    };

    getSurveys();
  };

  return (
    <div className="pt-5 pb-20 px-8 lg:px-20">
      {/* Page Header */}
      {!selectedSurvey && <PageHeader showRight={true} />}

      {selectedSurvey && (
        <p className="text-[26px] text-primary-cDark32 font-semibold">
          {selectedSurvey?.caption}
        </p>
      )}

      {!selectedSurvey && (
        <>
          {loading ? (
            <div className="h-[150px] flex items-center justify-center">
              <span className="loader" style={{ border: "3px solid black" }} />
            </div>
          ) : (
            <>
              {/* Survey Detail Component */}
              <div className="md:mt-20 mt-10">
                {surveys?.map((v, i) => {
                  return <SurveyDescription key={i} data={v} />;
                })}
              </div>

              {/* Recent Activities Table */}
              <div className="mt-20 md:block hidden">
                <RecentActivities
                  headerRows={activityHeaderRows}
                  tableDataKeys={tableDataKeys}
                  tableData={previousSurveys}
                />
              </div>
            </>
          )}
        </>
      )}

      {selectedSurvey && (
        <div className="md:mt-20 mt-10">
          <StartSurvey />
        </div>
      )}
    </div>
  );
}
