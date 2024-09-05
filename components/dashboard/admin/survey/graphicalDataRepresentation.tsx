import React from 'react'


interface graphData {
  name: string;
  total: number
}
const GraphicalDataRepresentation: React.FC<graphData> = ({ name, total }) => {
  return (
    <div className='flex-1 shadow-md overflow-hidden'>
      <div className='p-3 flex flex-col gap-2'>
        <div className='text-[#848A9C] text-[12px] font-[400] '>{name}</div>
        <div className='font-[700] text-[#006874] font-Nunito text-[18px]'>${`${total}`}</div>
      </div>
    </div>
  )
}

export default GraphicalDataRepresentation;