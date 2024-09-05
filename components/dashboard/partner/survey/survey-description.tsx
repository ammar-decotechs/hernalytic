import React from "react";

import { useVEOContext } from "@/providers/veo-context";
import { SurveyType, surveyType } from "@/definitions/survey-types";
import { Button } from "@/components/ui/button";

import moment from 'moment'

export default function AdminSurveyDescription({
  data,
  setSelectedSurvey,
}: {
  data: SurveyType;
  setSelectedSurvey: any;
}): React.ReactNode {

  return (
    <div className="pl-8 pr-14 py-10 bg-primary-cGreen0D flex items-center justify-between rounded-[8px]">
      <div className="md:w-[50%] w-full flex flex-col items-start gap-y-4">
        <p className="md:text-[20px] text-[16px] text-primary-cDark1D font-medium">
          {data?.caption}
        </p>
        <p className="md:block hidden text-[16px] text-primary-cDark1D font-normal">
          {data?.description || "Lorem ipsum dolor sit amet consectetur. In amet neque hendrerit donec in turpis scelerisque tempor. Bibendum neque purus porta ut amet ullamcorper sed quam tincidunt. Arcu luctus vestibulum consequat velit nisi vitae. Lacus proin tristique mauris dignissim amet potenti.Lorem ipsum dolor sit amet consectetur. In amet neque hendrerit donec in turpis scelerisque tempor. Bibendum neque purus porta ut amet ullamcorper sed quam tincidunt. Arcu luctus vestibulum consequat velit nisi vitae. Lacus proin tristique mauris dignissim amet potenti.Lorem ipsum dolor sit amet consectetur. In amet neque hendrerit donec in turpis scelerisque tempor. Bibendum neque purus porta ut amet ullamcorper sed quam tincidunt. Arcu luctus vestibulum consequat velit nisi vitae. Lacus proin tristique mauris dignissim amet potenti."}
        </p>
        <p className="md:hidden block text-[16px] text-primary-cDark1D font-normal">
          {/* {data?.description?.slice(0,200) + '...' || 'Catch up with the top discussions'} */}
          {data?.description || 'Catch up with the top discussions'}
        </p>
        
        <Button
          variant={"default"}
          className="px-[30px]"
          // disabled={moment().isBefore(completion_date_time) ? true : false }
          onClick={() => setSelectedSurvey(data)}
        >
          START SURVEY
        </Button>
      </div>

      <div className="hidden md:flex flex-col gap-y-2">
        <div className="flex flex-col items-start">
          <p className="text-[16px] text-primary-cDark1D font-medium">Date</p>
          <p className="text-[16px] text-primary-cDark1D font-normal">
            {data?.completion_date ? moment(data?.completion_date).format("DD/MM/YYYY") :"N/A"}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[16px] text-primary-cDark1D font-medium">Time</p>
          <p className="text-[16px] text-primary-cDark1D font-normal">
            {data?.completion_time || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[16px] text-primary-cDark1D font-medium">
            Polling Unit Name
          </p>
          <p className="text-[16px] text-primary-cDark1D font-normal">
            {data?.unitName || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[16px] text-primary-cDark1D font-medium">
            Polling Unit Address
          </p>
          <p className="text-[16px] text-primary-cDark1D font-normal">
            {data?.unitAddress || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
