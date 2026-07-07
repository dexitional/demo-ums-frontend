import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { RiNumber1 } from "react-icons/ri";

type Props = {
  iconBg: any;
  label: string;
  y1: any;
  y2: any;
  y3: any;
  y4: any;
};

function DashProgStatPillet({ iconBg = "bg-amber-500", label, y1, y2, y3, y4 }: Props) {
  return (
    <div className="p-3 min-h-max w-full md:w-44 flex flex-col justify-between space-y-2 font-poppins rounded-3xl bg-[#343438]">
      {/* YEAR 1 */}
      { y1 ?
      <div className="p-1 flex items-center space-x-3 bg-[#1e1d22] rounded-3xl">
        <div className={`p-1.5 w-fit h-fit flex items-center justify-center rounded-full ${iconBg}`}><div className="w-6 flex items-center justify-center text-base font-bold">Y1</div></div>
        <p className={`text-gray-300 tracking-wider`}>{y1}</p>
      </div> : null
      }
      { y2 ? 
      <div className="p-1 flex items-center space-x-3 bg-[#1e1d22] rounded-3xl">
        <div className={`p-1.5 w-fit h-fit flex items-center justify-center rounded-full ${iconBg}`}><div className="w-6  flex items-center justify-center text-base font-bold">Y2</div></div>
        <p className={`text-gray-300 tracking-wider`}>{y2}</p>
      </div> : null
      }
      { y3 ?
      <div className="p-1 flex items-center space-x-3 bg-[#1e1d22] rounded-3xl">
        <div className={`p-1.5 w-fit h-fit flex items-center justify-center rounded-full ${iconBg}`}><div className="w-6  flex items-center justify-center text-base font-bold">Y3</div></div>
        <p className={`text-gray-300 tracking-wider`}>{y3}</p>
      </div> : null
      }
      { y4 ?
      <div className="p-1 flex items-center space-x-3 bg-[#1e1d22] rounded-3xl">
        <div className={`p-1.5 w-fit h-fit flex items-center justify-center rounded-full ${iconBg}`}><div className="w-6  flex items-center justify-center text-base font-bold">Y4</div></div>
        <p className={`text-gray-300 tracking-wider`}>{y4}</p>
      </div> : null
      }
     
     
     {/* Main Stats */}
      <div className="space-y-1 tracking-wide text-center">
        <p className="text-sm font-medium text-gray-200 uppercase">{label}</p>
        <h3 className="font-sans font-semibold text-amber-200">{(y1+y2+y3+y4) || 0}</h3>
      </div>
    </div>
  );
}

export default DashProgStatPillet;
