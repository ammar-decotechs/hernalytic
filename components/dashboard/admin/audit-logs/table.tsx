import React from "react";

interface tableData {
  survey: string | React.ReactNode;
  status?: React.ReactNode;
  date: string;
  time: string;
  description?: string; 
}

export default function Table({
  headerRows,
  tableData,
  tableDataKeys
}: {
  headerRows: string[];
  tableData: tableData[];
  tableDataKeys:string[] ;
}): React.ReactNode {

  // tableData?.[0]?.[]

  return (
    <table
      className="min-w-[500px]"
      // style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}
      style={{ width: "100%" }}
    >
      <thead>
        <tr className="text-center bg-[#F2FBFD] border border-primary-cGreyCA">
          {headerRows?.map((item: any, index: number) => (
            <th
              key={index}
              
              className={`relative text-primary-cDark1D text-[16px] font-normal py-4`}
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="">
        {tableData?.map((item: any, index: number) => (
          <tr key={index} className={`text-center`}>
            <td
              className={`py-4 text-primary-cDark1D text-[16px] font-normal  ${
                index === tableData?.length - 1 &&
                "border-b border-primary-cGreyCA"
              }
                   border-l border-l-primary-cGreyCA border-t border-t-primary-cGreyCA`}
            >
              {index + 1}
            </td>
            {tableDataKeys.map((identifier, index2:number)=>(
            
            <td
              className={`py-3 text-primary-cDark1D text-[16px] font-normal border-t border-t-primary-cGreyCA ${
                index === tableData?.length - 1 &&
                "border-b border-b-primary-cGreyCA"
              } ${
                index2 === tableDataKeys?.length - 1 &&
                "border-b border-r border-b-primary-cGreyCA"
              }`
            }
            >
              {item[identifier]}
            </td>
            
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
