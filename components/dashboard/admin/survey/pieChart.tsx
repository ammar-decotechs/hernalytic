"use client";
// components/ApexChart.tsx
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

type ChartType = 'pie' | 'line' | 'area' | 'bar' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'boxPlot' | 'radar' | 'polarArea' | 'rangeBar' | 'rangeArea' | 'treemap';

interface ApexChartProps {
    options: any;
    series: any;
    type?: ChartType;
}

const ApexChart: React.FC<ApexChartProps> = ({ options, series, type }) => {
    const [isClient, setIsClient] = useState(false);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        setIsClient(true);
        if(typeof window !== "undefined"){
            setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        }
    }, []);

    if (!isClient) return null;

    let chartWidth = '100%';
    let chartHeight = options.chart.height || '100%';

    if (windowWidth <= 430) {
        chartWidth = '100%';
        chartHeight = '300px'; 
    } else {
        chartHeight = '400px'; 
    }

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type={type}
                    height={chartHeight}
                    width={chartWidth}
                />
            </div>
        </div>
    );
};

export default ApexChart;
