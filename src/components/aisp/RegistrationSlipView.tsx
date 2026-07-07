import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { IoPrint, IoRefreshSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Service from "../../utils/aisService";
import RegistrationSlipItem from "./RegistrationSlipItem";

type Props = {
  data?: any;
  title?: string;
};

function RegistrationSlipView({ title, data }: Props) {
  const navigate = useNavigate();
  const totalCredit = data.reduce((sum, cur) => sum + cur.course.creditHour, 0);

  const reset = async () => {
    if (data?.length) {
      const resp = await Service.deleteRegistration(data[0].indexno);
      if (resp) navigate(0);
    } else {
      toast.error("Please select your courses");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="w-full text-sm md:text-base font-bold font-roboto tracking-wider text-primary-dark/80 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        <div className="py-1 px-5 bg-primary/90 md:rounded-l md:rounded-tr-3xl text-white">
          {title}
        </div>
        <div className="flex space-x-2">
          <Link
            to="/print/registration"
            className="px-3 py-1 bg-primary-dark/80 text-xs md:text-sm text-white md:font-bold flex space-x-2 items-center justify-center rounded"
          >
            <IoPrint className="h-6 w-6 text-white" />
            <span>PRINT SLIP</span>
          </Link>
          <button
            onClick={reset}
            className="px-3 py-1 bg-red-400 text-xs md:text-sm text-white md:font-bold flex space-x-2 items-center justify-center rounded"
          >
            <IoRefreshSharp className="h-6 w-6 text-white" />
            <span>REVOKE REGISTRATION</span>
          </button>
        </div>
      </h1>
      <div className="pt-6 grid grid-cols-1 gap-y-4 border bg-slate-50/50 rounded-xl shadow-[0px_0px_8px_#ddd_inset]">
        <div className="px-6 pb-4  hidden md:grid grid-cols-5 place-items-center border-b border-slate-200 text-xs text-primary font-sans font-semibold uppercase tracking-widest">
          <div className="place-self-start">Code</div>
          <div className="col-span-2 place-self-start">Course</div>
          <div>Credit</div>
          <div>&nbsp;</div>
        </div>
        <div className="grid grid-cols-1 text-sm text-slate-600 font-roboto font-medium tracking-wider">
          {data?.map((row: any) => (
            <RegistrationSlipItem key={row.id} row={row} />
          ))}
          {!data.length && (
            <h1 className="w-full text-center text-gray-400 text-[0.65rem] font-semibold tracking-widest uppercase">
              No Courses
            </h1>
          )}
        </div>

        <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-6 md:gap-y-4 md:place-items-center border-slate-200 text-xs text-primary/70 font-roboto font-semibold uppercase tracking-widest">
          <div className="md:col-span-2 place-self-start flex items-center justify-between"></div>
          <div className="md:col-span-2 flex items-center justify-between">
            <span>
              Total Credits:&nbsp;&nbsp;&nbsp;
              <span className="text-primary-accent text-sm">{totalCredit}</span>
            </span>
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            <span>
              Date of Registration:&nbsp;&nbsp;&nbsp;
              <span className="text-primary-accent text-sm">
                {moment().format("MMM DD, YYYY") || "Not Set"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSlipView;
