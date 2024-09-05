import { Button } from "@headlessui/react";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Import the toastify CSS

interface SurveyPartsProps {
  setStep: (step: number) => void;
}

const questionTypes = {
  text: "Text",
  dropdown: "Dropdown",
  radio: "Radio",
};

//@ts-ignore
export default function SurveyTitle({ setStep, step }: SurveyPartsProps) {
  const [questions, setQuestions] = useState([
    { type: "text", question: "", placeholder: "", options: [], radioLabels: ["No", "Yes"] },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [newOption, setNewOption] = useState<{ [key: number]: string }>({});

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: "text", question: "", placeholder: "", options: [], radioLabels: ["No", "Yes"] }]);
  };

  const handleQuestionTypeChange = (index: number, newType: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = newType;
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    //@ts-ignore
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleRadioLabelChange = (index: number, labelIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].radioLabels[labelIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index: number) => {
    const option = newOption[index]?.trim();
    //@ts-ignore
    if (option && !questions[index].options.includes(option)) {
      const updatedQuestions = [...questions];
      //@ts-ignore
      updatedQuestions[index].options.push(option);
      setQuestions(updatedQuestions);
      setNewOption((prev) => ({ ...prev, [index]: "" }));
    }
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const toggleDropdown = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const validateForm = () => {
    for (const question of questions) {
      if (!question.question.trim()) {
        toast.error("Please fill out all question fields.");
        return false;
      }

      if (question.type === "text" && !question.placeholder.trim()) {
        toast.error("Please fill out all placeholder fields.");
        return false;
      }

      if (question.type === "dropdown" && question.options.length === 0) {
        toast.error("Please add at least one option to the dropdown.");
        return false;
      }

      if (question.type === "radio" && question.radioLabels.some(label => !label.trim())) {
        toast.error("Please ensure all radio labels are filled out.");
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  return (
    <div className="w-full">
      <ToastContainer /> 
      <h2 className="md:font-[600] md:text-[26px] text-[20px] font-[500] text-primary-cDark32 mt-10">
        Part A (Observer Information)
      </h2>
      <div className="lg:w-[70%] w-[98%] rounded-[8px] m-auto mt-20 relative">
        <div>

          {questions.map((q, index) => (
            <div className="flex items-start gap-3" key={index}>
              <div className="w-full px-4 py-6 shadow-lg text-[18px] mb-4 border border-gray-300 rounded-lg bg-white">
                <div className="flex justify-between gap-4 items-start">
                  <div className="flex flex-col gap-3 w-[70%]">
                    <div className="text-[#3B4665] text-[20px] font-[500]">Question</div>
                    <input
                      className="border outline-none p-2 rounded text-[15px] w-full"
                      placeholder="Write question here"
                      type="text"
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(index, "question", e.target.value)
                      }
                    />

                    {q.type === "text" && (
                      <input
                        className="border outline-none p-2 rounded text-[15px] w-full"
                        placeholder="Write placeholder here"
                        type="text"
                        value={q.placeholder}
                        onChange={(e) =>
                          handleQuestionChange(index, "placeholder", e.target.value)
                        }
                      />
                    )}

                    {q.type === "dropdown" && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            className="border outline-none p-2 rounded text-[15px] w-full"
                            placeholder="Add new option here"
                            type="text"
                            value={newOption[index] || ""}
                            onChange={(e) => setNewOption(prev => ({ ...prev, [index]: e.target.value }))}
                          />
                          <IoIosAdd
                            fontSize={'26px'}
                            cursor={"pointer"}
                            onClick={() => handleAddOption(index)}
                          />
                        </div>

                        {dropdownOpen === index && (
                          <div className="bg-gray-100 border rounded-lg mt-2 p-2">
                            <div className="text-[#707070] text-[14px]">
                              {q.options.length > 0 ? (
                                q.options.map((option, i) => (
                                  <div key={i} className="py-1 px-2 border-b last:border-b-0">
                                    {option}
                                  </div>
                                ))
                              ) : (
                                <div className="py-2 text-center text-[#707070]">No options added</div>
                              )}
                            </div>
                          </div>
                        )}

                        {q.options.length > 0 && (
                          <ul className="list-disc ml-4 mt-2">
                            {q.options.map((option, i) => (
                              <li key={i} className="py-1 text-[#707070] text-[14px]">
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}


                      </div>
                    )}

                    {q.type === "radio" && (
                      <>
                        <div className="flex flex-col gap-2">
                          {q.radioLabels.map((label, labelIndex) => (
                            <div key={labelIndex} className="flex gap-2 items-center">
                              <input
                                type="radio"
                                id={`radio-${index}-${labelIndex}`}
                                name={`radio-${index}`}
                                value={label}
                              />
                              <input
                                className="border outline-none p-1 rounded text-[15px]"
                                type="text"
                                value={label}
                                onChange={(e) =>
                                  handleRadioLabelChange(index, labelIndex, e.target.value)
                                }
                              />
                              <label htmlFor={`radio-${index}-${labelIndex}`} className="text-[#707070] text-[14px]">
                                {label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 w-[30%]">
                    <div className="text-[#3B4665] text-[20px] font-[500]">Question Type</div>
                    <select
                      className="border px-4 py-1 rounded-md w-full"
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
                {questions.length > 1 && (
                  <div className="mt-5 flex justify-end">
                    <MdDeleteOutline
                      cursor={"pointer"}
                      fontSize={"23px"}
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-red-500"
                    />
                  </div>
                )}
              </div>
              {index === questions.length - 1 && (
                <div className="border px-2 py-2">
                  <IoIosAdd
                    fontSize={"30px"}
                    cursor={"pointer"}
                    onClick={handleAddQuestion}
                    className="text-primary-cDark32"
                  />
                </div>
              )}

            </div>
          ))}
        </div>
        <div className="flex w-full justify-center items-center my-20 flex-col">
          <Button onClick={handleSave} className="md:w-[400px] w-full bg-[#006874] text-[16px] font-[500] text-white py-2 my-3 mt-10">
            SAVE TO PREVIEW
          </Button>
          <Button
            onClick={() => setStep(step - 1)}
            className="md:w-[400px] w-full py-2 text-[16px] font-[500] text-primary-cDark7D"
            //@ts-ignore
            variant="solid"
          >
            GO BACK
          </Button>
        </div>
      </div>
    </div>
  );
}
