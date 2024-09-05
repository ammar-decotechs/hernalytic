import React from 'react';
import ApexChart from './pieChart';

type ChartType = 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radar' | 'scatter' | 'bubble' | 'heatmap' | 'treemap' | 'radialBar' | 'polarArea';


interface graphCardData {
    data:string;
    chartOption: any;
    chartSeriese?: number[];
    type?: ChartType; 
    optionSeries?:any
  }
  
  const GraphCard: React.FC<graphCardData> = ({ data,chartOption, chartSeriese,optionSeries, type }) => {
    return (
      <div className="flex-1 shadow-md border pt-4 pb-2 overflow-hidden">
        <div className="h-20">
          <h1 className="text-center mb-5 text-[#243465] font-[600] text-[18px]">{data}</h1>
        </div>
        <ApexChart type={type} options={chartOption} series={chartSeriese ?? optionSeries} />
      </div>
    );
  };
  
  export default GraphCard;
  
