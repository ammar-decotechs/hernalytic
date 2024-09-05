"use client";

import React from "react";
import moment from "moment";
import { useAppSelector } from "@/redux/hooks";

interface Props {
  title?: string;
  description?: string;
  showRight?: boolean;
}

export default function PageHeader({
  title,
  description,
  showRight,
}: Props): React.ReactNode {
   
  const {firstname, lastname} = useAppSelector((state) => state?.user)  
    
  const localName =
  (firstname && lastname) ? firstname +" "+ lastname : typeof window !== "undefined" && localStorage.getItem("name");

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start gap-y-3">
        <p className="text-[26px] text-primary-cDark32 font-semibold">
          {title ? title : `Welcome, ${localName ? localName : ""}`}
        </p>
        <p className="text-[13px] text-primary-cGreyAC">
          {description
            ? description
            : "Here is everything you need to stay updated"}
        </p>
      </div>

      {showRight && (
        <div className="hidden md:flex flex-col items-end gap-y-2">
          <p className="text-[16px] text-primary-cDark32 font-semibold">
            {moment().format("dddd")}
          </p>
          <p className="text-[16px] text-primary-cGrey78">
            {moment().format("Do MMMM, YYYY")}
          </p>
        </div>
      )}
    </div>
  );
}
