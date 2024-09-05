"use client";

import React from "react";
import ObserverNav from "./nav";
import { getSurveyQuestion } from "@/services/observer";
import SurveyQuestions from "./survey-questions";
import { useVEOContext } from "@/providers/veo-context";

export function Survey({ id }: { id: null | string }) {
  const { setActiveSurvey, setSurveyAnswers, setFormStep } = useVEOContext();

  React.useEffect(() => {
    const getQuestions = async () => {
      // @ts-ignore
      const res = await getSurveyQuestion(id);

      if (res) {
        setFormStep(0);
        setActiveSurvey(res);

        const tempAnswers: any = [];

        res?.categories?.map((cat: any) => {
          cat?.questions?.map((item: any, index: number) => {
            tempAnswers?.push({
              categoryId: cat?.id,
              question_id: item?.id,
              is_boolean: item?.is_boolean,
              yes_no: item?.is_boolean,
              comment: "",
              answer_input: "",
              is_active: true,
              id: index,
            });
          });
        });

        setSurveyAnswers(tempAnswers);
      }
    };

    if (id) {
      getQuestions();
    }
  }, [id]);

  return (
    <>
      <ObserverNav />
      <SurveyQuestions />
    </>
  );
}
