import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";

type Props = {
  iconBg: any;
  label: string;
  value: string;
  female: string;
  male: string;
};

function DashStatPillet({ iconBg = "bg-amber-500", label, value, female, male }: Props) {
  return (
    <div className="p-3 min-h-max w-full md:w-44 flex flex-col justify-between space-y-2 font-poppins rounded-3xl bg-[#343438]">
      <div className="p-1 flex items-center space-x-3 bg-[#1e1d22] rounded-3xl">
        <div className={`p-1.5 w-fit h-fit rounded-full ${iconBg}`}><FaMale className="h-4 w-4" /></div>
        <p className={`text-gray-400 tracking-wider`}>{male}</p>
      </div>
      <div className="p-1 flex items-center space-x-3 bg-[#1e1d22] rounded-3xl">
        <div className={`p-1.5 w-fit h-fit rounded-full ${iconBg}`}><FaFemale className="h-4 w-4" /></div>
        <p className={`text-gray-400 tracking-wider`}>{female}</p>
      </div>
      <div className="space-y-1 tracking-wide text-center">
        <p className="text-sm font-medium text-[#858589]">{label}</p>
        <h3 className="font-sans font-semibold text-gray-200">{value}</h3>
      </div>
    </div>
  );
}

export default DashStatPillet;
