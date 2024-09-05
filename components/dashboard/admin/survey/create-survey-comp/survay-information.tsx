"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createServay } from '@/redux/services/admin/admin';
import local from 'next/font/local';

interface SurveyPartsProps {
  setStep: (step: number) => void;
}

export default function SurvayInformation({ setStep }: SurveyPartsProps) {
  const [question, setQuestion] = useState('');
  const [pollingUnitName, setPollingUnitName] = useState('');
  const [pollingUnitAddress, setPollingUnitAddress] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [additionalComment, setAdditionalComment] = useState('');
  const [isPublished, setIsPublished] = useState(false); 

  const handleSubmit = async () => {
    try {

      if (!date || !time) {
        alert("Error: Date and time must be provided.");
        return;
      }
  
      const dateTimeString = `${date}T${time}`;
      const dateObj = new Date(dateTimeString);
  
      if (isNaN(dateObj.getTime())) {
        alert("Error: Invalid date or time format.");
        return;
      }
  
      const formattedDate = dateObj.toISOString(); 
      const formattedTime = formattedDate.split("T")[1];
  
      console.log("formatted",formattedDate)
      console.log("formattedTime",formattedTime)
      const allData = {
        caption: question,
        completion_time: formattedTime,
        completion_date: formattedDate,
        description: additionalComment,
        published: isPublished,
      };
  
  
      for (const [key, value] of Object.entries(allData)) {
        if (key !== 'published' && !value) {
          alert(`Error: The field "${key}" cannot be empty.`);
          return;
        }
      }  
      const res = await createServay(allData);
      if (res) {
        localStorage.setItem("serveyData", JSON.stringify(res.data));
        setStep(2);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  

  return (
    <div className="lg:w-[50%] md:w-[70%] w-full mx-auto">
      <div className="w-[80%] m-auto py-10">
        <div className="w-full flex justify-between">
          <h2 className="text-primary-cDark65 md:text-[39px] md:font-[700] text-[25px] font-[500]">
            Survey Information
          </h2>
        </div>

        <div className="flex flex-col my-10 gap-3">
          <label className="text-[20px] font-[500] text-primary-cDark65">Survey Title *</label>
          <input
            type="text"
            placeholder="Text field"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 h-[48px] py-1 outline-none rounded-[8px] border border-primary-cGrey92"
          />
        </div>

        <div className="flex flex-col my-10 gap-3">
          <label className="text-[20px] py-2 font-[500] text-primary-cDark65">
            Survey’s Description
          </label>
          <div className="w-full p-1 rounded-[8px] gap-y-3 border border-primary-cGrey92">
            <textarea
              className="w-full border-none outline-none p-2 rounded-[8px] resize-none"
              placeholder="Survey’s Description"
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col my-10 gap-3">
          <label className="text-[20px] font-[500] text-primary-cDark65">Date *</label>
          <input
            type="date"
            placeholder="Time"
            name="time"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 h-[48px] py-1 outline-none rounded-[8px] border border-primary-cGrey92"
          />
        </div>

        <div className="flex flex-col my-10 gap-3">
          <label className="text-[20px] font-[500] text-primary-cDark65">Time *</label>
          <input
            type="time"
            placeholder="Date"
            name="date"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 h-[48px] py-1 outline-none rounded-[8px] border border-primary-cGrey92"
          />
        </div>
        <div className="flex items-center my-10 gap-3">
          <label className="text-[20px] font-[500] text-primary-cDark65">Publish</label>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-[20px] h-[20px] outline-none border border-primary-cGrey92"
          />
        </div>

        <div className="w-full p-2 mt-4">
          <Button className="w-full py-2 text-[16px] font-[500]" onClick={handleSubmit}>
            Next
          </Button>
          <Link href="/admin/survey/manage/">
            <Button className="w-full py-2 text-[16px] font-[500]" variant="solid">
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
