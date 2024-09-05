import React from 'react'
import PartnerNav from '../navbar'
import dynamic from 'next/dynamic';
// import GraphicalRepresenation from '@/components/dashboard/admin/survey/graph'
const GraphicalRepresenation = dynamic(
  () => import('@/components/dashboard/admin/survey/graph'),
  { ssr: false },
)
import Footer from '@/components/layout/footer'
import AdminRecentActivities from '../survey/recent-activities'
import { Tag } from "@/components/ui/tag";



export default function Home() {
  const recentActivities = [
    {
      caption: "Edo Governorship Election Survey",
      survey_status: <Tag variant={"complete"}>Submitted</Tag>,
      date: "21/01/2024",
      time: "2:00am",
    },
    {
      caption: "Edo Governorship Election Survey",
      survey_status: <Tag variant={"complete"}>Submitted</Tag>,
      date: "21/01/2024",
      time: "10:00am",
    },
    {
      caption: "Edo Governorship Election Survey",
      survey_status: <Tag variant={"complete"}>Submitted</Tag>,
      date: "21/01/2024",
      time: "4:00am",
    },
    {
      caption: "Edo Governorship Election Survey",
      survey_status: <Tag variant={"complete"}>Submitted</Tag>,
      date: "21/01/2024",
      time: "2:00am",
    },
    {
      caption: "Edo Governorship Election Survey",
      survey_status: <Tag variant={"complete"}>Submitted</Tag>,
      date: "21/01/2024",
      time: "10:00am",
    },
  ];

  const tableDataKeys = ["caption", "survey_status", "date", "time"];

  const headerRows = ["S/N", "Survey", "Survey Status", "Date", "Time"];
  return (
    <div>
      <PartnerNav />
      <GraphicalRepresenation heading='Good Day, Adetola' link='' text='Here is everything you need to stay updated' bool={true} />
      <div className='px-8 lg:px-20'>
        <AdminRecentActivities
          headerRows={headerRows}
          tableDataKeys={tableDataKeys}
          tableData={recentActivities}
        />
      </div>
      <Footer />

    </div>
  )
}


