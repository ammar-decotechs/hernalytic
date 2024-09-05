import React from "react";
import { useVEOContext } from "@/providers/veo-context";

import ProgressTrack from "@/components/forms/progress-track";
import QForm from "@/components/forms/Q";
import ConfirmFormSubmissionModal from "./confirm-submission-modal";
import VEOFormSubmittedSuccessfully from "@/components/forms/successful";

export default function SurveyQuestions() {
  const { activeSurvey, submitted } = useVEOContext();
  return (
    <div className="pt-5 pb-20 px-8 lg:px-20">
      {!submitted && (
        <>
          <h1 className="text-primary-cDark32 text-[26px] font-semibold mb-20">
            {activeSurvey?.title}
          </h1>
          <div className="w-full md:max-w-[60%] mx-auto">
            <ProgressTrack />
            <QForm />
          </div>
        </>
      )}

      {/* <ConfirmFormSubmissionModal /> */}

      {submitted && <VEOFormSubmittedSuccessfully />}

      {/* {formStep === 0 && <QForm />} */}
      {/* {formStep === 1 && <Q02Form />} */}
      {/* {formStep === 2 && <Q03Form />} */}
      {/* {formStep === 3 && <Q04Form />} */}
      {/* {formStep === 4 && <Q05Form />} */}
      {/* {formStep === 5 && <Q06Form />} */}
      {/* {formStep === 6 && <Q07Form />} */}
    </div>
  );
}
