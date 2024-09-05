import { SurveyParts } from './../../../definitions/survey-types';
import React from "react";

import ProcessCard from "./process-card";
import { Tag } from "@/components/ui/tag";
import { useVEOContext } from "@/providers/veo-context";

const processes = [
  {
    survey: "Part A (Voting Process)",
    description:
      "Lorem ipsum dolor sit amet consectetur. In amet neque hendrerit donec in turpis scelerisque tempor. Bibendum neque purus porta ut amet ullamcorper sed quam tincidunt. Arcu luctus vestibulum consequat velit nisi vitae. Lacus proin tristique mauris dignissim ",
    status: <Tag variant={"complete"}>Submitted</Tag>,
    date: "",
    time: "",
  },
  {
    survey: "Part B (Result Sorting and Counting Process)",
    description:
      "Lorem ipsum dolor sit amet consectetur. In amet neque hendrerit donec in turpis scelerisque tempor. Bibendum neque purus porta ut amet ullamcorper sed quam tincidunt. Arcu luctus vestibulum consequat velit nisi vitae. Lacus proin tristique mauris dignissim ",
    status: <Tag variant={"danger"}>Not Started</Tag>,
    date: "",
    time: "",
  },
];

export default function StartSurvey() {
  const { selectedSurvey} = useVEOContext();


  return (
    <div className="flex flex-col gap-y-5">
      {selectedSurvey?.surveyparts?.map((item:SurveyParts, index:number) => (
        <ProcessCard key={index} data={item} />
      ))}
    </div>
  );
}
