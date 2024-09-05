import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { creatServayPart } from '@/redux/services/admin/admin';
import { IoIosAdd } from 'react-icons/io';
import { MdDeleteOutline, MdOutlineCreate } from 'react-icons/md';

interface SurveyPartsProps {
  setStep: (step: number) => void;
}

export default function SurveyParts({ setStep, step }: any) {
  const [partsData, setPartsData] = useState([
    { title: '', description: '',category:'', is_active: true },
  ]);

  console.log("portData",partsData)
  const getDataLocal = JSON.parse(localStorage.getItem("serveyData") || '{}');

  const handleInputChange = (index: number, field: 'title' | 'description' | 'category' | 'is_active', value: any) => {
    const updatedParts = [...partsData];
    ///@ts-ignore
    updatedParts[index][field] = value;
    setPartsData(updatedParts);
  };

  const handleSubmit = async () => {
    setStep(3);

    // try {
    //   const isFormComplete = partsData.every((part) => part.title && part.description);

    //   if (!isFormComplete) {
    //     alert('Error: All parts must have both a title and a description.');
    //     return;
    //   }

    //   const modifiedData = partsData.map((item: any) => ({
    //     ...item,
    //     survey_id: getDataLocal.id,
    //   }));

    //   for (const item of modifiedData) {
    //     const res = await creatServayPart(item);
    //     if (res?.status !== 200) {
    //       throw new Error("Failed to submit part data.");
    //     }
    //   }

    //   setStep(3);
    // } catch (error) {
    //   console.error("Error submitting parts data:", error);
    // }
  };

  return (
    <div className="lg:w-[50%] md:w-[70%] w-full mx-auto">
      <div className="w-[80%] m-auto py-10">
        <div className="w-full flex justify-between">
          <h2 className="text-primary-cDark65 text-[39px] font-[700]">
            Survey Parts
          </h2>
        </div>


        {partsData.map((_, index) => (
          <div key={index}>
            <div className='flex justify-between mt-8 items-center'>
              <h2 className="text-[24px] font-[500] py-5 text-primary-cDark65">
                Part {index + 1}
              </h2>
              {
                index === partsData.length - 1 && 
                <div 
                onClick={() => setPartsData([...partsData, { title: '', description: '',category:'', is_active: true }])} 
                className='px-3 py-3 cursor-pointer border text-[20px]'
              >
                <IoIosAdd size={23} />
              </div>
              }
             
            </div>
            <div className="flex flex-col my-4 gap-3">
              <label className="text-[20px] font-[500] text-primary-cDark65">Part Title</label>
              <input
                type="text"
                placeholder={`Survey Title for Part`}
                value={partsData[index]?.title || ''}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                className="w-full px-3 h-[48px] py-1 outline-none rounded-[8px] border border-primary-cGrey92"
              />
            </div>
            <div className="flex flex-col my-4 gap-3">
              <label className="text-[20px] font-[500] text-primary-cDark65">Description</label>
              <input
                type="text"
                placeholder={`Survey Description for Part`}
                value={partsData[index]?.description || ''}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                className="w-full px-3 h-[48px] py-1 outline-none rounded-[8px] border border-primary-cGrey92"
              />
            </div>
            <div className="flex flex-col my-4 gap-3">
              <label className="text-[20px] font-[500] text-primary-cDark65">Category</label>
              <input
                type="text"
                placeholder={`Category`}
                value={partsData[index]?.category || ''}
                onChange={(e) => handleInputChange(index, 'category', e.target.value)}
                className="w-full px-3 h-[48px] py-1 outline-none rounded-[8px] border border-primary-cGrey92"
              />
            </div>
            {/* <div className="flex items-center gap-3 my-4">
              <label className="text-[20px] font-[500] text-primary-cDark65">Is Active</label>
              <input
                type="checkbox"
                checked={partsData[index]?.is_active || false}
                onChange={(e) => handleInputChange(index, 'is_active', e.target.checked)}
                className="w-[20px] h-[20px] outline-none border border-primary-cGrey92"
              />
            </div> */}
             <div className="  p-2 flex justify-between items-center mt-4 gap-y-2">
          <div className='flex items-center gap-4'>
          <MdOutlineCreate cursor={"pointer"} fontSize={"22px"} />
          <MdDeleteOutline cursor={"pointer"} fontSize={"22px"} />
          </div>
          <Button className=" w-fit py-2 text-[16px] font-[500]" onClick={handleSubmit}>
            Create Survey
          </Button>
        </div>
          </div>
        ))}

       
      </div>
    </div>
  );
}
