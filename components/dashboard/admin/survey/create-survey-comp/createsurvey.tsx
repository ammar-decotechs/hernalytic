"use client";

import React, { useState } from 'react';
import AdminNav from "../../navbar";
import Footer from "../../footer";
import SurvayInformation from "./survay-information"; 
import SurveyParts from "./survey-parts";
import SurveyTitle from "./survey-title"; 

export default function CreateSurvey() {
  const [step, setStep] = useState<number>(1); 

  return (
    <div>
      <AdminNav />

      <div className="lg:px-20 md:px-10 px-2">
        {step === 1 ? (
          //@ts-ignore
          <SurvayInformation setStep={setStep}  step={step}/>
        ) : step === 2 ? (
          <SurveyParts setStep={setStep} step={step} />
        ) : step === 3 ? (
          <SurveyTitle  setStep={setStep} step={step}  />
        ) : (
          ""
        )}
      </div>

      <Footer />
    </div>
  );
}
