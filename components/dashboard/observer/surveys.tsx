"use client";

import React, { useEffect } from "react";
import moment from "moment";

import ObserverNav from "./nav";
import Footer from "./footer";
import SurveysTable from "./surveys-table";
import { Tag } from "@/components/ui/tag";
import Q01Form from "@/components/forms/Q01";
import Q02Form from "@/components/forms/Q02";
import Q03Form from "@/components/forms/Q03";
import Q04Form from "@/components/forms/Q04";
import Q05Form from "@/components/forms/Q05";
import Q06Form from "@/components/forms/Q06";
import Q07Form from "@/components/forms/Q07";
import { getPreviousSurveys } from "@/services/observer";
import { SurveyType } from "@/definitions/survey-types";

interface tableData {
  survey: React.ReactNode;
  status: React.ReactNode;
  date: string;
  time: string;
}

const surveyHeaderRows = [
  "S/N",
  "Survey",
  "Survey status",
  "Date",
  "Time Taken",
];

const tableDataKeys = ["survey", "status", "date", "time"];

export default function ObserverSurvey(): React.ReactNode {
  const [showSurvey, setShowSurvey] = React.useState<boolean>(false);
  const [surveys, setSurveys] = React.useState<tableData[]>([]);

  useEffect(() => {
    const getSurveys = async () => {
      const res = await getPreviousSurveys();
      if (res) {
        let tempSurveys: tableData[] = [];
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

        setSurveys(tempSurveys);
      }
    };

    getSurveys();
  }, []);

  return (
    <>
      <ObserverNav />
      <div className="pt-5 pb-20 px-8 lg:px-20">
        {!showSurvey && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start gap-y-3">
                <p className="text-[26px] text-primary-cDark32 font-semibold">
                  Survey
                </p>
                <p className="text-[13px] text-primary-cGreyAC">
                  Here is everything you need to stay updated
                </p>
              </div>
            </div>

            {/* Survey Table */}
            <div className="mt-20">
              <SurveysTable
                headerRows={surveyHeaderRows}
                tableDataKeys={tableDataKeys}
                tableData={surveys}
              />
            </div>
          </>
        )}

        {showSurvey && (
          <div className="w-full flex justify-center">
            <div className="xl:w-[50%] lg:w-[60%] md:w-[70%] ms:w-[80%] w-[90%] flex flex-col items-center gap-y-5">
              <Q01Form />
              <Q02Form />
              <Q03Form />
              <Q04Form />
              <Q05Form />
              <Q06Form />
              <Q07Form />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
