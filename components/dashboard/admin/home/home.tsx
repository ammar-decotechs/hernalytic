"use client";

import PageHeader from "@/components/shared/page-header";
import AbsorverActivities from "./absorver-activities";
import PartnersActivities from "./partners-activities";
import RecentLogs from "./recent-logs";
import SeeAll from "./see-all";
import SeeAllPartners from "./see-all-partners";
import { useState } from "react";

export default function Home() {
  const [seeall, setSeeall] = useState<string | null>(null);

  return (
    <div className="pt-5 pb-20 px-8 lg:px-20">
      <PageHeader
        description="Here is everything you need to stay updated"
        showRight={true}
      />

      {seeall === "observer" ? (
        <SeeAll />
      ) : seeall === "partner" ? (
        <SeeAllPartners />
      ) : (
        <>
          <div className="grid grid-cols-6 gap-4 mt-28">
            <div className="lg:col-span-4 col-span-6">
              <AbsorverActivities setSeeall={setSeeall} />
            </div>
            <div className="lg:col-span-2 col-span-6">
              <PartnersActivities setSeeall={setSeeall} />
            </div>
          </div>
          <RecentLogs />
        </>
      )}
    </div>
  );
}
