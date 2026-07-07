import React from "react";
import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  iconBg: any;
  label: string;
  value: string;
};

function DashPillet({ Icon, iconBg = "bg-amber-500", label, value }: Props) {
  return (
    <div className="p-3 h-32 w-28 flex flex-col justify-between font-poppins rounded-3xl bg-[#343438]">
      <div className={`p-2 w-fit h-fit rounded-xl ${iconBg}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1 tracking-wide">
        <p className="text-xs font-medium text-[#858589]">{label}</p>
        <h3 className="font-sans font-semibold text-gray-200">{value}</h3>
      </div>
    </div>
  );
}

export default DashPillet;
