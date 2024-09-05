import React from "react";
import { X } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { useVEOContext } from "@/providers/veo-context";
import { submitSurvey } from "@/services/observer";
import Modal from "../../ui/modal";
import {setOpen} from "../../../redux/slices/generalSlice";


export default function ConfirmFormSubmissionModal(): React.ReactNode {
  const dispatch = useAppDispatch();
  const { setSubmitConfirm, setSubmitted, surveyAnswers } = useVEOContext();

  return (
    <Modal>
      <div className="w-3xl p-[40px] flex flex-col">
        {/* header */}
        <div className="flex items-center justify-end">
          <X className="text-primary-cGrey62" onClick={() =>   dispatch(setOpen(false))} />
        </div>
        {/* content */}
        <div className="mt-10">
          <p className="text-[39px] text-primary-cBlue73">
            Are you sure you want to submit?
          </p>
        </div>
        {/* buttons */}
        <div className="mt-20 flex items-center justify-end gap-x-2">
          <button
            type="button"
            className="w-32 py-[10px] bg-transparent border border-primary-cBlue73 text-center text-primary-cBlue73 text-[17px] font-semibold rounded-[8px]"
            onClick={() =>   dispatch(setOpen(false))}
          >
            NO
          </button>
          <button
            type="button"
            className="w-32 py-[10px] bg-primary-cBlue73 text-center text-white text-[17px] font-semibold rounded-[8px]"
            // onClick={() => setSubmitted(true)}
            onClick={async () => {
              const res = await submitSurvey({ answers: surveyAnswers });

              if (res) {
                dispatch(setOpen(false)) 
                setSubmitted(true);
              }
            }}
          >
            YES
          </button>
        </div>
      </div>
    </Modal>
  );
}
