"use client"

import React from 'react'
// import { useVEOContext } from "@/providers/veo-context";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import { Button } from "@/components/ui/button";
import { useVEOContext } from '@/providers/veo-context';
import { Circle } from 'lucide-react';
import {setOpen} from "../../../redux/slices/generalSlice";
import ConfirmFormSubmissionModal from "./confirm-submission-modal";

export default function Preview() {
  const dispatch = useAppDispatch();
  // const { setOpen } = useAppSelector((state) => state.general);
    const {
        activeSurvey, surveyAnswers, setSubmitConfirm,
      } = useVEOContext();
    
console.log("active state preview", activeSurvey)
console.log("answer state preview", surveyAnswers)

  return (
    <div className="sm:pt-10 lg:w-[50%] md:w-[70%] w-[95%] mx-auto flex flex-col gap-y-10">
      <ConfirmFormSubmissionModal/>
      {
        activeSurvey?.categories?.map((category:any) => (
          <div className="flex flex-col gap-y-5">
          <h1 className="text-xl sm:text-[39px] leading-tight text-left text-primary-cDark65 font-jost font-bold">
          {category?.name}
        </h1>
            <div className="space-y-10">
            {category?.questions?.map(
            (item: any, index: number) => (
              <div className="space-y-2">
                <span className="text-primary-cDark65 font-medium text-[20px]">
                  {item?.text} *
                </span>

                {item?.is_boolean && (
                  <div className="flex items-center gap-10">
                    <div
                      className="flex items-center gap-2"
                      // onClick={() => setBooleanHandler(item, true)}
                    >
                      <div className="aspect-square flex items-center justify-center size-[18.5px] rounded-full border-[1.5px] border-primary-cGrey70 text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                        {surveyAnswers?.filter(
                          (ans: any) => ans?.question_id == item?.id && ans?.categoryId === category?.id
                        )?.[0]?.yes_no && (
                          <div className="flex items-center justify-center">
                            <Circle className="size-3 text-primary-cDark3A fill-primary-cDark3A" />
                          </div>
                        )}
                      </div>

                      <p className="capitalize text-sm text-primary-cGrey70 !m-0">
                        Yes
                      </p>
                    </div>

                    <div
                      className="flex items-center gap-2"
                      // onClick={() => setBooleanHandler(item, false)}
                    >
                      <div className="aspect-square flex items-center justify-center size-[18.5px] rounded-full border-[1.5px] border-primary-cGrey70 text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                        {surveyAnswers?.filter(
                          (ans: any) => ans?.question_id == item?.id && ans?.categoryId === category?.id
                        )?.[0]?.yes_no == false && (
                          <div className="flex items-center justify-center">
                            <Circle className="size-3 text-primary-cDark3A fill-primary-cDark3A" />
                          </div>
                        )}
                      </div>

                      <p className="capitalize text-sm text-primary-cGrey70 !m-0">
                        No
                      </p>
                    </div>
                  </div>
                )}

                {item?.is_boolean === false && (
                  <div className="flex items-center gap-10">
                    <input
                      value={
                        surveyAnswers?.filter(
                          (ans: any) => ans?.question_id == item?.id && ans?.categoryId === category?.id
                        )?.[0]?.answer_input
                      }
                      placeholder="text"
                      disabled={true}
                      // type={type}
                      className={
                        "w-full h-12 rounded-lg text-base placeholder:text-primary-cGreyAC border border-primary-cGrey92 placeholder:text-back placeholder:font-normal px-4 text-primary-cDark65 focus-visible:outline-none focus:outline-none border-destructive"
                      }
                      // onChange={(e) => textHandler(item, e?.target?.value)}
                    />
                  </div>
                )}
              </div>
            )
          )}
            </div>
          </div>
        ))
      }




    <div className=" w-full m-auto py-10">
      <div className="w-full  p-2 mt-4">
        <Button className="w-full py-2 text-[16px] font-[500]" onClick={()=> dispatch(setOpen(true)) }>
         SUBMIT
        </Button>

        <Link  href="/observer/">
        <Button className="w-full py-2 text-[16px] font-[500]" variant="solid">
         GO BACK
        </Button>
        </Link>
      
      </div>
    </div>
  </div>
);

  
}

