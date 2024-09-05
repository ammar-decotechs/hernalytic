import React from 'react';
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import SurvayQuestionModal from "./survay-question-modal"
import {setOpen} from "../../../../../redux/slices/generalSlice";


export default function ObserveInformation() {
  const dispatch = useAppDispatch();

  return (
    <>
    <div className="lg:w-[70%] w-[95%] border m-auto bg-primary-cGreen0D lg:p-20 md:p-10 p-5 ">
      <div className="w-full flex justify-between">
        <h2 className="text-primary-cDark65 text-[39px] text-[25px] font-[600] font-[700]">
          Observer’s Information
        </h2>
      </div>

      <div className="flex flex-col my-10 gap-3">
        <label className="text-[20px] font-[500]">Question *</label>
        <input
          type="text"
          placeholder="Text field"
          name="question"
          className="w-full px-3 py-1 h-[48px] outline-none rounded-[8px] bg-transparent border border-primary-cGrey92"
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
              className="px-3 py-1 w-5 h-5 rounded-[8px] border border-primary-cGrey92"
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="Female"
              className="px-3 py-1 w-5 h-5 rounded-[8px] border border-primary-cGrey92"
            />
            Female
          </label>
        </div>
      </div>

      <div className="w-full mt-8 rounded-[8px] gap-y-3 pt-5 my-4">
        <label className="text-[20px] py-2 font-[500]">
          Was polling unit easy to locate?
        </label>
        <div className="flex gap-x-3 mt-2 my-5">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="additionalComments"
              value="Yes"
              className="px-3 py-1 w-5 h-5 rounded-[8px] border border-primary-cGrey92"
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="additionalComments"
              value="No"
              className="px-3 py-1 w-5 h-5 rounded-[8px] border border-primary-cGrey92"
            />
            No
          </label>
        </div>
        <div className="w-full p-2 rounded-[8px] gap-y-3 border border-primary-cGrey92">
          <textarea
            className="w-full border-none outline-none p-2 bg-transparent rounded-[8px] resize-none"
            placeholder="Additional Comments"
          />
        </div>
      </div>

      <div
        onClick={() => dispatch(setOpen(true))}
        className="w-[60px] cursor-pointer bg-white mt-32 rounded-[5px] h-[60px] m-auto flex justify-center items-center"
      >
        <div className="w-[30px] p-1 text-[20px] text-primary-cplusicon58 bg-primary-cButtonFF h-[30px] m-auto rounded-full flex justify-center items-center">
          +
        </div>
      </div>


    </div>





<div className="w-full">

<div className="lg:w-[70%] w-[98%] rounded-[8px] m-auto  mt-20 ">
      <div className=" w-full md:px-20 px-8 bg-primary-cGreen0D h-[586px] relative mx-auto py-6">
        <input  className="md:font-[700] font-[500] text-[25px] md:text-[39px] mt-3 text-primary-cDark65 bg-transparent w-[70%] border-none outline-none px-5 py-1" placeholder="Section Title"/>
        <div
        onClick={() => dispatch(setOpen(true))}
        className="w-[60px] cursor-pointer bg-white mt-44 rounded-[5px] h-[60px] m-auto flex justify-center items-center"
      >
        <div className="w-[30px] p-1 text-[20px] text-primary-cplusicon58 bg-primary-cButtonFF h-[30px] m-auto rounded-full flex justify-center items-center">
          +
        </div>
      </div>
      </div>

<div className="flex w-full justify-center my-20 items-center flex-col">
<Button className="md:w-[400px] w-full text-[16px] font-[500] text-white py-2 my-3 mt-10">SAVE TO PREVIEW
      </Button>
      <Button className="md:w-[400px] w-full py-2 text-[16px] font-[500] va text-primary-cDark7D" variant="solid">GO BACK
      </Button>
</div>
      
      </div>

      <SurvayQuestionModal />
  
</div>
</>  );
}
