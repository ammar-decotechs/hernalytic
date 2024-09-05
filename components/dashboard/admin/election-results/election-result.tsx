import React from 'react';
import Upload from "./upload";
import Navbar from "../navbar";
import AllResults from "./election-result-data"

export default function ElectionResult() {
  return (
    <>
      <Navbar />
      <div className="pt-5 pb-20 px-8 lg:px-20">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-y-3">
            <p className="text-[26px] text-primary-cDark32 font-semibold">
              Welcome, Adetola
            </p>
            <p className="text-[13px] text-primary-cGreyAC">
              Here is everything you need to stay updated
            </p>
          </div>
        </div>
        <Upload />
<AllResults />
      </div>
    </>
  );
}
