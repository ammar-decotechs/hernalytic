"use client"

import React, { useState } from "react";
import { Survey } from "@/components/dashboard/observer/survey";
import { useRouter } from "next/navigation";

export default function Page(): React.ReactNode {
  const [surveyId, setSurveyId] = useState<null | string>(null)
  React.useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const sessionId = queryParameters.get('id')
    setSurveyId(sessionId)
  },[])

  const router = useRouter()
  return (
    <>
      <Survey id={surveyId} />
    </>
  );
}
