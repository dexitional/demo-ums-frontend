import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";

type Props = {
  iconBg: any;
  label: string;
  value: any;
 
};

function DashStatPillet({ iconBg = "bg-amber-500", label, value }: Props) {
  return (
    <div className="p-3 min-h-max w-full md:w-44 flex flex-col justify-between space-y-2 font-poppins rounded-3xl bg-[#343438]">
     <div className="space-y-1 tracking-wide text-center">
        <p className="text-sm font-medium text-gray-200 uppercase">{label}</p>
        <h3 className="font-sans font-semibold text-amber-200">{value}</h3>
      </div>
    </div>
  );
}

export default DashStatPillet;
