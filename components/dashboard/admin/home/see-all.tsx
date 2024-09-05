import { useAppSelector } from '@/redux/hooks';
import React from 'react'
import { obserActivities } from "@/redux/interface/admin";



export default function SeeAll() {
  const {adminObserver} = useAppSelector(state=>state.admin);


   
    
      return (
        <div className="px-6 pt-4 pb-8 border-t  border-r border-l border-primary-cLightF1 bg-primary-cLightbgFD rounded-[8px] rounded-tr-[8px]  overflow-x-auto no_scrollbar mt-28">
              <div className="sm:w-full w-[600px]">
              <div className="flex items-center py-2 justify-between border-b border-primary-cLightF1">
            <p className="text-[24px] text-primary-cDark1D font-semibold">
              Observer Activities
            </p>
            <div className="flex items-center">
              <p className="text-[16px] text-primary-cOrange00  hidden">See All</p>
            </div>
          </div>
    
          <div className="grid grid-cols-7  gap-x-16 text-primary-cDark1D text-[16px] font-[600] mt-4">
            <div className="col-span-3">Observer</div>
            <div className="col-span-2 w-full text-end">Survay Submitted</div>
            <div className="col-span-2  text-end w-fulls">Survay Not Submitted</div>
          </div>
          {adminObserver.map((data:obserActivities) => (
        <div key={data.user_id} className="grid grid-cols-7 items-center gap-x-16   text-primary-cDark1D text-[16px] font-[500] mt-4">
          <div className="col-span-3 flex items-center gap-2">
            <div className="w-12 h-12  overflow-hidden rounded-full border">
              <img
                src="data:image/png;base64,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"
                alt=""
                className="w-full "
              />
            </div>
            <p className=" text-primary-cDark1D ">{data.firstname} {data.lastname}</p>
          </div>
          <div className="col-span-2 w-full text-end">
            {data.survey_submitted}
          </div>
          <div className="col-span-2 w-full text-end">
            {data.survey_not_submitted}
          </div>
        </div>
      ))}
              </div>
         
        </div>
      );
}

