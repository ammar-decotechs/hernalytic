"use client";
import { useRouter } from 'next/navigation';
import { FormField, FormItem } from "@/components/ui/form";
import { useVEOContext } from "@/providers/veo-context";
import VEOFormWrapper from "./form-wrapper";
import CustomFormLabel from "./form-label";
import FormControlInput from "./form-control-input";
import CustomFormRadio from "./radio-input";
import FormNextButton from "./next-button";
import { z } from "zod";
import { observerFormSchema } from "@/definitions/veo-form-schemas";
import CustomFormMessage from "./form-message";
import { Circle } from "lucide-react";


export default function QForm(): React.ReactNode {
  const router:any = useRouter();
  const {
    observerForm,
    formStep,
    setFormStep,
    activeSurvey,
    surveyAnswers,
    setSurveyAnswers,
    setSubmitConfirm,
  } = useVEOContext();


  function setBooleanHandler(question: any, value: boolean) {
    let filteredAnswers = surveyAnswers?.filter(
      (ans: any) => ans?.question_id !== question?.id
    );
    let updatedArr = surveyAnswers?.filter(
      (ans: any) => ans?.question_id == question?.id
    )?.[0];
    setSurveyAnswers([...filteredAnswers, { ...updatedArr, yes_no: value }]);
  }

  function textHandler(question: any, value: string) {
    let filteredAnswers = surveyAnswers?.filter(
      (ans: any) => ans?.question_id !== question?.id
    );
    let updatedArr = surveyAnswers?.filter(
      (ans: any) => ans?.question_id == question?.id
    )?.[0];
    setSurveyAnswers([
      ...filteredAnswers,
      { ...updatedArr, answer_input: value },
    ]);
  }

  function onNextClick() {
    let filteredAnswers = surveyAnswers?.filter(
      (item: any) => item?.categoryId == activeSurvey?.categories[formStep]?.id
    );
    let unFilledFields = [];
    filteredAnswers?.map((item: any) => {
      // if(item?.is_boolean){
      //   if (item?.yes_no == false) {
      //     unFilledFields.push(item);
      //   }
      // }else {
      //   if (item?.answer_input?.length == 0) {
      //     unFilledFields.push(item);
      //   }
      // }

      if (!item?.is_boolean) {
        if (item?.answer_input?.length == 0) {
          unFilledFields.push(item);
        }
      }
    });

    if (unFilledFields?.length == 0) {
      if (formStep === activeSurvey?.categories?.length - 1) {
        console.log('inside open modal');
        // setSubmitConfirm(true);
        router.push("/observer/previewform");
        (true);
      } else {
        setFormStep((formStep: number) => formStep + 1);
      }
    } else {
      typeof window !== "undefined" && window.alert("Fill all the fields");
    }
  }

  return (
    <>
      <div className="space-y-5 max-w-full sm:max-w-full pt-0 sm:pt-10 w-full mx-auto fade-in-30 mb-0">
        <h1 className="text-xl sm:text-[39px] leading-tight text-left text-primary-cDark65 font-jost font-bold">
          {activeSurvey?.categories[formStep]?.name}
        </h1>
        <div className="space-y-10">
          {activeSurvey?.categories[formStep]?.questions?.map(
            (item: any, index: number) => (
              <div className="space-y-2">
                <span className="text-primary-cDark65 font-medium text-[20px]">
                  {item?.text} *
                </span>

                {item?.is_boolean && (
                  <div className="flex items-center gap-10">
                    <div
                      className="flex items-center gap-2"
                      onClick={() => setBooleanHandler(item, true)}
                    >
                      <div className="aspect-square flex items-center justify-center size-[18.5px] rounded-full border-[1.5px] border-primary-cGrey70 text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                        {surveyAnswers?.filter(
                          (ans: any) => ans?.question_id == item?.id
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
                      onClick={() => setBooleanHandler(item, false)}
                    >
                      <div className="aspect-square flex items-center justify-center size-[18.5px] rounded-full border-[1.5px] border-primary-cGrey70 text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                        {surveyAnswers?.filter(
                          (ans: any) => ans?.question_id == item?.id
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
                          (ans: any) => ans?.question_id == item?.id
                        )?.[0]?.answer_input
                      }
                      placeholder="text"
                      // type={type}
                      className={
                        "w-full h-12 rounded-lg text-base placeholder:text-primary-cGreyAC border border-primary-cGrey92 placeholder:text-back placeholder:font-normal px-4 text-primary-cDark65 focus-visible:outline-none focus:outline-none border-destructive"
                      }
                      onChange={(e) => textHandler(item, e?.target?.value)}
                    />
                  </div>
                )}
              </div>
            )
          )}

          <div className="w-full !mt-[60px]">
            <button
              type="button"
              className="w-full py-[15px] bg-primary-cGreen74 text-center text-white font-medium rounded"
              onClick={() => {
                onNextClick();
              }}
            >
              {formStep === activeSurvey?.categories?.length - 1
                ? "PREVIEW"
                : "NEXT"}
            </button>

            {formStep > 0 && (
              <button
                onClick={() => setFormStep((formStep: number) => formStep - 1)}
                className="w-full py-[15px] text-center text-primary-cDark7D font-medium rounded mt-3"
              >
                GO BACK
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
