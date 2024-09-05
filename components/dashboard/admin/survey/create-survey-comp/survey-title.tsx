"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SurvayQuestionModal from "./survay-question-modal";
import ObserveInformation from "./observer-information";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

interface SurveyPartsProps {
  setStep: (step: number) => void;
}

const questionTypes = {
  text: "Text",
  dropdown: "Dropdown",
  radio: "Radio",
};

export default function SurveyTitle({ setStep, step }: any) {
  const [questions, setQuestions] = useState([
    { type: "text", question: "", placeholder: "" },
  ]);

  // Handle adding a new question
  const handleAddQuestion = () => {
    setQuestions([...questions, { type: "text", question: "", placeholder: "" }]);
  };

  // Handle changing the question type
  const handleQuestionTypeChange = (index: number, newType: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = newType;
    setQuestions(updatedQuestions);
  };

  // Handle question text change
  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    //@ts-ignore
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle question removal
  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="w-full">
      <h2 className="md:font-[600] md:text-[26px] text-[20px] font-[500] text-primary-cDark32 mt-10">
        Part A (Observer Information)
      </h2>
      <div className="lg:w-[70%] w-[98%] rounded-[8px] m-auto mt-20">
        {questions.map((q, index) => (
          <div key={index} className="w-full px-2 pb-6 pt-6 pl-8 pr-8 shadow-lg text-[18px] mb-4">
            <div className="flex justify-between gap-4 items-start p-3">
              <div className="flex flex-col gap-3 w-[70%]">
                <div className="flex gap-2 items-center">
                  <div className="text-[#3B4665] text-[20px] font-[500]">
                    Question
                  </div>
                  <IoIosAdd
                    fontSize={"20px"}
                    cursor={"pointer"}
                    onClick={handleAddQuestion}
                  />
                </div>
                <input
                  className="border outline-none p-2 rounded text-[15px]"
                  placeholder="Write question here"
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                />

                {/* Show input based on question type */}
                {q.type === "text" && (
                  <input
                    className="border outline-none p-2 rounded text-[15px]"
                    placeholder="Write placeholder here"
                    type="text"
                    value={q.placeholder}
                    onChange={(e) =>
                      handleQuestionChange(index, "placeholder", e.target.value)
                    }
                  />
                )}
                {q.type === "radio" && (
                  <>
                    <div className="flex gap-2">
                      <input type="radio" value="male" />
                      <label className="text-[#707070] text-[14px]">Male</label>
                    </div>
                    <div className="flex gap-2">
                      <input type="radio" value="female" />
                      <label className="text-[#707070] text-[14px]">Female</label>
                    </div>
                  </>
                )}
                {q.type === "dropdown" && (
                  <select className="border px-4 py-1 rounded-md">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                  </select>
                )}
              </div>

              <div className="flex flex-col gap-4 w-[30%]">
                <div className="text-[#3B4665] text-[20px] font-[500]">Question Type</div>
                <select
                  className="border px-4 py-1 rounded-md"
                  value={q.type}
                  onChange={(e) =>
                    handleQuestionTypeChange(index, e.target.value)
                  }
                >
                  <option value="text">Text</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="radio">Radio Option</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <MdDeleteOutline
                cursor={"pointer"}
                fontSize={"23px"}
                onClick={() => handleRemoveQuestion(index)}
              />
            </div>
          </div>
        ))}

        {/* Save and Go Back Buttons */}
        <div className="flex w-full justify-center items-center my-20 flex-col">
          <Button className="md:w-[400px] w-full text-[16px] font-[500] text-white py-2 my-3 mt-10">
            SAVE TO PREVIEW
          </Button>
          <Button
            onClick={() => setStep(step - 1)}
            className="md:w-[400px] w-full py-2 text-[16px] font-[500] text-primary-cDark7D"
            variant="solid"
          >
            GO BACK
          </Button>
        </div>
      </div>

      <SurvayQuestionModal />
      <ObserveInformation />
    </div>
  );
}
