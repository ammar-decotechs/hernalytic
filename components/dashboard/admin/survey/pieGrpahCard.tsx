import React from 'react'
import ApexChart from './pieChart';


interface piechat{
  options:any,
  seires:number[],
  text:string
}

const PieGrpahCard:React.FC<piechat> = ({options,seires,text}) => {
  return (
    <div className='flex-1 min-w-0 shadow-md border pt-4 pb-2 overflow-auto'>
    <h1 className='text-center mb-5 text-[#243465] font-[600] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]'>{text}</h1>
    <div className='w-full min-h-[200px]'>
        <ApexChart type='pie' options={options} series={seires} />
    </div>
</div>
  )
}

export default PieGrpahCard;