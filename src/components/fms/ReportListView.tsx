import React from "react";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { Form } from "react-router-dom";
import ReportDateFilter from "./ReportDateFIlter";
import ReportDropdown from "./ReportDropdown";

type Props = {
  programs: any;
  majors: any;
  sessions: any;
  services: any;
  asessions: any;
};

function ReportListView({
  programs,
  majors,
  sessions,
  services,
  asessions,
}: Props) {
  return (
    <div className="py-6 grid grid-cols-1 gap-y-4 border bg-slate-50/50 rounded-xl">
      <div className="px-6 pb-4  hidden md:grid grid-cols-6 place-items-center border-b border-slate-200 text-xs text-gray-500 font-sans font-semibold uppercase tracking-widest">
        <div className="col-span-2 place-self-start">REPORT NAME</div>
        <div className="col-span-3 place-self-start">PARAMETERS</div>
        <div>Action</div>
      </div>
      {/* Payments */}
      <Form
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Payments
        </div>
        <div className="p-2 w-full md:col-span-3 md:place-self-start border rounded grid md:grid-cols-2 gap-2 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <span className="col-span-2">
            <ReportDropdown
              label="SERVICE"
              name="service"
              options={services?.map((r) => ({ label: r.title, value: r.id }))}
            />
          </span>
          <ReportDateFilter
            label="START PERIOD"
            name="start"
            options={services?.map((r) => ({ label: r.title, value: r.id }))}
          />
          <ReportDateFilter
            label="END PERIOD"
            name="end"
            options={services?.map((r) => ({ label: r.title, value: r.id }))}
          />
        </div>
        <div>
          <input type="hidden" name="type" value="payments" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />{" "}
          </button>
        </div>
      </Form>
      {/* Bills */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">Bills</div>
        <div className="p-2 md:col-span-3 md:place-self-start border rounded grid md:grid-cols-2 gap-2 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <ReportDropdown
            label="PROGRAM"
            name="program"
            options={programs?.map((r) => ({
              label: r.shortName,
              value: r.id,
            }))}
          />
          {/* <ReportDropdown label="YEAR" name="year" options={[1,2,3,4].map(r => ({ label: `Year ${r}`, value: r}))} /> */}
          <ReportDropdown
            label="ACADEMIC SESSION"
            name="session"
            options={sessions?.map((r) => ({
              label: `${r.title} - ${r.tag}`,
              value: r.id,
            }))}
          />
        </div>
        <div>
          <input type="hidden" name="type" value="bills" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />{" "}
          </button>
        </div>
      </Form>

      {/* Charges */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">Charges</div>
        <div className="p-2 w-full md:col-span-3 md:place-self-start border rounded grid md:grid-cols-2 gap-2 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <ReportDateFilter
            label="START PERIOD"
            name="start"
            options={services?.map((r) => ({ label: r.title, value: r.id }))}
          />
          <ReportDateFilter
            label="END PERIOD"
            name="end"
            options={services?.map((r) => ({ label: r.title, value: r.id }))}
          />
        </div>
        <div>
          <input type="hidden" name="type" value="charges" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />{" "}
          </button>
        </div>
      </Form>

      {/* Debtors */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">Debtors</div>
        <div className="p-2 md:col-span-3 md:place-self-start border rounded grid md:grid-cols-2 gap-2 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <ReportDropdown
            label="PROGRAM"
            name="program"
            options={programs?.map((r) => ({
              label: r.shortName,
              value: r.id,
            }))}
          />
          <ReportDropdown
            label="MAJOR"
            name="major"
            options={majors?.map((r) => ({
              label: `${r.shortName} - ${r.program.shortName}`,
              value: r.id,
            }))}
          />
          <ReportDropdown
            label="YEAR"
            name="year"
            options={[1, 2, 3, 4].map((r) => ({
              label: `Year ${r}`,
              value: r,
            }))}
          />
          <ReportDropdown
            label="MODE"
            name="mode"
            options={["M", "E", "W"].map((r) => ({
              label: r == "E" ? "Evening" : r == "W" ? "Weekend" : "Morning",
              value: r,
            }))}
          />
        </div>
        <div>
          <input type="hidden" name="type" value="debtors" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />{" "}
          </button>
        </div>
      </Form>
      {/* Student Exams Eligibilty */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Exams Eligibilty
        </div>
        <div className="p-2 md:col-span-3 md:place-self-start border rounded grid md:grid-cols-2 gap-2 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <ReportDropdown
            label="PROGRAM"
            name="program"
            options={programs?.map((r) => ({
              label: r.shortName,
              value: r.id,
            }))}
          />
          <ReportDropdown
            label="MAJOR"
            name="major"
            options={majors?.map((r) => ({
              label: `${r.shortName} - ${r.program.shortName}`,
              value: r.id,
            }))}
          />
          <ReportDropdown
            label="YEAR"
            name="year"
            options={[1, 2, 3, 4]?.map((r) => ({
              label: `Year ${r}`,
              value: r,
            }))}
          />
          <ReportDropdown
            label="MODE"
            name="mode"
            options={["M", "E", "W"]?.map((r) => ({
              label: r == "E" ? "Evening" : r == "W" ? "Weekend" : "Morning",
              value: r,
            }))}
          />
        </div>
        <div>
          <input type="hidden" name="type" value="eligible" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />
          </button>
        </div>
      </Form>

      {/* Vouchers*/}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Vouchers
        </div>
        <div className="p-2 md:col-span-3 md:place-self-start border rounded grid md:grid-cols-2 gap-2 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <ReportDropdown
            label="ADMISSION SESSION"
            name="asession"
            options={asessions?.map((r) => ({ label: r.title, value: r.id }))}
          />
        </div>
        <div>
          <input type="hidden" name="type" value="voucher" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />
          </button>
        </div>
      </Form>
    </div>
  );
}

export default ReportListView;
