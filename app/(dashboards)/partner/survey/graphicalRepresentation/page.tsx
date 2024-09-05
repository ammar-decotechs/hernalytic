import dynamic from 'next/dynamic';
const GraphicalRepresenation = dynamic(
  () => import('@/components/dashboard/admin/survey/graph'),
  { ssr: false },
)
// import GraphicalRepresenation from '@/components/dashboard/admin/survey/graph';
import React from 'react'

const Page = () => {
  return (
    <div>
        <GraphicalRepresenation heading='Edo Governorship Election Survey'link='/partner/survey/result/' partner={true}  bool={false} />
    </div>
  )
}
export default Page;