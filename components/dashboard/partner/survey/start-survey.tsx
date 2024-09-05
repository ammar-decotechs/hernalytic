import React from "react";
import ProcessCard from "../../observer/process-card";

const surveyParts = [
  {
    id: 1,
    title: "Voting Process",
    description:
      "This section covers questions related to the voting process, covering key activities that occur at the start of the election voting process",
    is_active: true,
    status: "Not Started",
  },
  {
    id: 1,
    title: "Result Counting",
    description:
      "This section covers questions related to the end of the voting process from result counting to announcement",
    is_active: true,
    status: "Not Started",
  },
];

export default function AdminStartSurvey(): React.ReactNode {
  return (
    <div className="flex flex-col gap-y-5">
      {surveyParts?.map((item: any, index: number) => (
        <ProcessCard key={index} data={item} disabled={true} />
      ))}
    </div>
  );
}
