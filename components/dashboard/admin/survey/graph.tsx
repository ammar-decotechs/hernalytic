import dynamic from 'next/dynamic'
import GraphicalDataRepresentation from '@/components/dashboard/admin/survey/graphicalDataRepresentation';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FiDownload } from 'react-icons/fi';
import GraphCard from './graphCard';
import PieGrpahCard from './pieGrpahCard';
import { text } from 'stream/consumers';
import { boolean } from 'zod';
import { usePathname } from 'next/navigation'
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';
const ApexChart = dynamic(
    () => import('@/components/dashboard/admin/survey/pieChart'),
    { ssr: false }
)

interface graphicalRepresentationData {
    bool?: boolean,
    heading: string,
    text?: string,
    link: string,
    partner?: boolean
}

const GraphicalRepresenation: React.FC<graphicalRepresentationData> = ({ heading, bool, text, link, partner }) => {


    const options = {
        chart: {
            width: '100%',
            type: 'pie',
        },
        labels: ['Early', 'Late'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const option = {
        chart: {
            width: '100%',
            type: 'pie',
        },
        labels: ['Yes', 'No'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const option1 = {
        chart: {
            width: '100%',
            type: 'pie',
        },
        labels: ['before 8:30am', '8:31 to 9:30am', '9:31 to 10:30am', '10:31 to 12 noon', 'After 12 noon', 'After 2:30pm'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const series = [50, 55];
    const seriess = [40, 70];
    const seriess1 = [40, 70, 43, 35, 80, 30];

    const optionSeries = [
        {
            name: 'Male',
            data: [44, 55, 41, 67, 22, 43]
        },
        {
            name: 'Female',
            data: [13, 23, 20, 8, 13, 27]
        },
    ];

    const barOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            }
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '01/01/2011 GMT',
                '01/02/2011 GMT',
                '01/03/2011 GMT',
                '01/04/2011 GMT',
                '01/05/2011 GMT',
                '01/06/2011 GMT'
            ]
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    };

    const chartSeriese = [44, 55];

    const chartOption = {
        chart: {
            type: 'donut',
        },
        labels: ['Male', 'Female'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%',
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
    };

    return (
        <>
            <div>
                {
                    partner ?
                        <Link href={link}>
                            <div className=' px-8 lg:px-20 mt-10 cursor-pointer pt-5 flex items-center gap-2'>
                                <IoArrowBack size={20} />
                                Back to previous page
                            </div>
                        </Link> : <></>
                }

                <div className="mt-10 pt-5 pb-20 px-8 lg:px-20">
                    <div className='border border-solid rounded border-[#BFC8CA] p-5'>
                        <div className='flex flex-col gap-4 lg:flex-row md:justify-between items-start lg:items-center'>
                            <div className='font-[600] text-[15px]  md:text-[18px] lg:text-[24px] text-[#1C1C1C]'>{heading}</div>

                            <div className={`flex flex-col md:flex-row md:justify-between items-center gap-5 ${bool ? "hidden" : ''}`}>
                                <Button className='flex items-center gap-2 px-6 py-2' variant={"outline"}>
                                    <FiDownload />  Download
                                </Button>
                                <div className='text-[#6F797B]  md:text-left  font-[400] text-[14px] md:text-[14px] lg:text-[16px]'>Graphical Representation</div>
                            </div>
                        </div>
                        {
                            bool &&
                            <div className='text-[13px] font-normal text-[#A9ACAC] mt-1'>{text}</div>
                        }
                        <div className='flex flex-col lg:flex-row gap-3 mt-12'>
                            <div className='flex flex-col gap-3 flex-1'>
                                <div className='flex-1 flex flex-col gap-3'>
                                    <GraphicalDataRepresentation name='Accredited Voters' total={325000} />
                                    <GraphicalDataRepresentation name='Female Voters' total={325000} />
                                </div>
                            </div>
                            <GraphCard data='Voter’s Distribution' type='donut' chartSeriese={chartSeriese} chartOption={chartOption} />
                            <GraphCard data='INEC officials Arrival' type='pie' chartSeriese={series} chartOption={options} />
                            <GraphCard data='Assistance for New and Existing mothers' type='pie' chartSeriese={series} chartOption={options} />
                        </div>

                        {/* Bar Chart */}
                        <div className='flex flex-col lg:flex-row gap-3 mt-12'>
                            <GraphCard data='Officials  Gender Distribution' type='bar' optionSeries={optionSeries} chartOption={barOptions} />
                            <GraphCard data='Election Organization' type='bar' optionSeries={optionSeries} chartOption={barOptions} />
                        </div>

                        {/* Additional Pie Charts */}
                        <div className='flex flex-col lg:flex-row gap-3 mt-12'>
                            <PieGrpahCard text='What time did accreditation start?' options={option1} seires={seriess1} />
                            <PieGrpahCard text='What time did voting start?' options={option1} seires={seriess1} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GraphicalRepresenation;
