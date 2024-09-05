import React, { useState } from 'react';
import Modal from "@/components/ui/modal";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "@/redux/hooks";
import { setOpen } from "../../../../../redux/slices/generalSlice";
import { Button } from "@/components/ui/button";

export default function SurveyQuestionModal() {
    const dispatch = useAppDispatch();

    // State management for form inputs
    const [question, setQuestion] = useState('');
    const [gender, setGender] = useState('');
    const [pollingLocation, setPollingLocation] = useState('');
    const [sectionTitle, setSectionTitle] = useState('');
    const [pollingComment, setPollingComment] = useState(''); // First comment
    const [additionalComment, setAdditionalComment] = useState(''); // Second comment

    const handleSubmit = () => {
        console.log({
            question,
            gender,
            pollingLocation,
            sectionTitle,
            pollingComment,
            additionalComment,
        });
    };

    return (
        <Modal>
            <div className="w-[80%] m-auto py-10">
                <div className="w-full flex justify-between">
                    <h2 className="text-primary-cmodaltext74 text-[26px] font-[700]">
                        Pick a Question Type
                    </h2>
                    <IoMdClose
                        className="text-[30px] cursor-pointer"
                        onClick={() => dispatch(setOpen(false))}
                    />
                </div>

                <div className="flex flex-col my-10 gap-3">
                    <label className="text-[20px] font-[500]">Question *</label>
                    <input
                        type="text"
                        placeholder="Text fild"
                        name="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-3 h-[48px] py-1 outline-none rounded-[8px] border border-primary-cGrey92"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-[20px] font-[500]">Gender *</label>
                    <div className="flex gap-x-3">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === 'Male'}
                                onChange={() => setGender('Male')}
                                className="px-3 py-1 w-5 h-5  rounded-[8px] border border-primary-cGrey92"
                            />
                            Male
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === 'Female'}
                                onChange={() => setGender('Female')}
                                className="px-3 py-1 w-5 h-5 rounded-[8px] border border-primary-cGrey92"
                            />
                            Female
                        </label>
                    </div>
                </div>

                <div className="flex justify-center my-10 items-center flex-col mx-auto w-full">
                    <div className="w-full bg-primary-cGreen0D h-[300px] mx-auto">
                        <input
                            className="font-[700] text-[39px] mt-3 text-primary-cDark65 bg-transparent w-[70%] border-none outline-none px-5 py-1"
                            placeholder="Section Title"
                            value={sectionTitle}
                            onChange={(e) => setSectionTitle(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full mt-8 p-2 rounded-[8px] gap-y-3 border border-primary-cGreen76">
                    <label className="text-[20px] font-[500]">
                        Was polling unit easy to locate?
                    </label>
                    <div className="flex gap-x-3 mt-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="pollingLocation"
                                value="Yes"
                                checked={pollingLocation === 'Yes'}
                                onChange={() => setPollingLocation('Yes')}
                                className="px-3 py-1 w-5 h-5 rounded-[8px] border border-primary-cGrey92"
                            />
                            Yes
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="pollingLocation"
                                value="No"
                                checked={pollingLocation === 'No'}
                                onChange={() => setPollingLocation('No')}
                                className="px-3 py-1 w-5 h-5 rounded-[8px] border border-primary-cGrey92"
                            />
                            No
                        </label>
                    </div>
                    <div className="w-full p-2 mt-4 rounded-[8px] gap-y-3 border border-primary-cGrey92">
                        <textarea
                            className="w-full border-none outline-none p-2 rounded-[8px] resize-none"
                            placeholder="Comments"
                            value={pollingComment}
                            onChange={(e) => setPollingComment(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full mt-8 rounded-[8px] gap-y-3">
                    <label className="text-[20px] py-2 font-[500]">
                    Was polling unit easy to locate ?

                    </label>
                    <div className="w-full p-2 rounded-[8px] gap-y-3 border border-primary-cGrey92">
                        <textarea
                            className="w-full border-none outline-none p-2 rounded-[8px] resize-none"
                            placeholder="Additional Comments"
                            value={additionalComment}
                            onChange={(e) => setAdditionalComment(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-max p-2 mt-4">
                    <Button className="w-[200px] py-2" onClick={handleSubmit}>
                        ADD
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
