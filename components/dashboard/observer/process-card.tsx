import React from "react";

import { Button } from "@/components/ui/button";
import { SurveyParts } from "@/definitions/survey-types";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

export default function ProcessCard({
  data,
  disabled,
}: {
  data: SurveyParts;
  disabled?: boolean;
}): React.ReactNode {
  return (
    <div className="pl-8 pr-14 py-10 bg-primary-cGreen0D flex items-start justify-between rounded-[8px]">
      <div className="md:w-[50%] w-full flex flex-col items-start gap-y-4">
        <div className="flex flex-col gap-y-2">
          <p className="md:text-[20px] text-[16px] text-primary-cDark1D font-medium">
            {data?.title}
          </p>
          <Tag
            className="sm:hidden inline-flex w-max"
            variant={
              data.status == "Completed"
                ? "complete"
                : data.status == "Not Started"
                ? "danger"
                : "pending"
            }
          >
            {data.status}
          </Tag>
        </div>
        <p className="md:block hidden text-[16px] text-primary-cDark1D font-normal">
          {data?.description}
        </p>
        <p className="md:hidden block text-[16px] text-primary-cDark1D font-normal">
          {data?.description ||
            // {data?.description?.slice(0, 150) + "..." ||
            "Catch up with the top discussions"}
        </p>

        {/* <Button className="px-[30px]" onClick={() => router.push(`/observer/survey`, {state : {id:data?.id}})} >START SURVEY</Button> */}
        <Button
          className="px-[30px]"
          disabled={data?.status == "Completed" ? true : false}
          // disabled={disabled ? disabled : false}
        >
          <Link
            href={{ pathname: "/observer/survey", query: { id: data?.id } }}
            // className={data?.status == "Completed" ? "pointer-events-none" : ""}
            // aria-disabled={data?.status == "Completed" ? true : false}
            // tabIndex={data?.status == "Completed" ? -1 : undefined}
          >
            START SURVEY
          </Link>
        </Button>
      </div>

      <Tag
        className="sm:block hidden"
        variant={
          data.status == "Completed"
            ? "complete"
            : data.status == "Not Started"
            ? "danger"
            : "pending"
        }
      >
        {data.status}
      </Tag>
    </div>
  );
}
