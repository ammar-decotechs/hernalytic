import dynamic from 'next/dynamic';
const GraphicalRepresenation = dynamic(
  () => import('@/components/dashboard/admin/survey/graph'),
  { ssr: false },
)

// import GraphicalRepresenation from '@/components/dashboard/admin/survey/graph'
import React from 'react'

import AdminNav from '@/components/dashboard/admin/navbar';
import AdminSurveyNav from '@/components/dashboard/admin/survey-nav';

const Page = () => {
  return (
    <div>
        <AdminNav />
        <AdminSurveyNav />
        <GraphicalRepresenation heading='Edo Governorship Election Survey' partner={true} link="/admin/survey/analyze/" bool={false} />
    </div>
  ) 
}

export default Page