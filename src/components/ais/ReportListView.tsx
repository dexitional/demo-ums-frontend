import React from "react";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { Form } from "react-router-dom";
import ReportDropdown from "./ReportDropdown";

type Props = {
  programs: any;
  majors: any;
  sessions: any;
  rsessions: any;
  gsessions: any;
};

function ReportListView({
  programs,
  majors,
  sessions,
  rsessions,
  gsessions,
}: Props) {
  return (
    <div className="py-6 grid grid-cols-1 gap-y-4 border bg-slate-50/50 rounded-xl">
      <div className="px-6 pb-4  hidden md:grid grid-cols-6 place-items-center border-b border-slate-200 text-xs text-gray-500 font-sans font-semibold uppercase tracking-widest">
        <div className="col-span-2 place-self-start">REPORT NAME</div>
        <div className="col-span-3 place-self-start">PARAMETERS</div>
        <div>Action</div>
      </div>
      {/* Student Registration */}
      <Form
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Student Registrations
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
          <input type="hidden" name="type" value="student_registration" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />{" "}
          </button>
        </div>
      </Form>
      {/* Student Deferments */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Student Deferments
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
          <input type="hidden" name="type" value="student_deferment" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />{" "}
          </button>
        </div>
      </Form>
      {/* Student Debtors */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Student Debtors
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
          <input type="hidden" name="type" value="student_debtor" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />{" "}
          </button>
        </div>
      </Form>
      {/* Student Profiles */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Student Profiles
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
          <input type="hidden" name="type" value="student_profile" />
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
          <input type="hidden" name="type" value="exam_eligible" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />
          </button>
        </div>
      </Form>

      {/* Resit Defaulter */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Resitting students
        </div>
        <div className="p-2 md:col-span-3 md:place-self-start border rounded grid md:grid-cols-2 gap-2 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <ReportDropdown
            label="ACADEMIC SESSION"
            name="session"
            options={sessions?.map((r) => ({
              label: `${r.title} - ${r.tag}`,
              value: r.id,
            }))}
          />
          <ReportDropdown
            label="RESIT SESSION"
            name="rsession"
            options={rsessions?.map((r) => ({ label: r.title, value: r.id }))}
          />
        </div>
        <div>
          <input type="hidden" name="type" value="resit" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />
          </button>
        </div>
      </Form>
      {/* Graduating Students */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Graduating Students
        </div>
        <div className="p-2 md:col-span-3 md:place-self-start border rounded grid md:grid-cols-1 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <ReportDropdown
            label="GRADUATION SESSION"
            name="gsession"
            options={gsessions?.map((r) => ({ label: r.title, value: r.id }))}
          />
        </div>
        <div>
          <input type="hidden" name="type" value="graduate_list" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />
          </button>
        </div>
      </Form>
      {/* Graduating Broadsheet */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          Graduating Broadsheet
        </div>
        <div className="p-2 md:col-span-3 md:place-self-start border rounded grid md:grid-cols-1 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <ReportDropdown
            label="PROGRAM"
            name="program"
            options={programs?.map((r) => ({
              label: r.shortName,
              value: r.id,
            }))}
          />
          {/* <ReportDropdown
            label="GRADUATION SESSION"
            name="gsession"
            options={gsessions?.map((r) => ({ label: r.title, value: r.id }))}
          /> */}
        </div>
        <div>
          <input type="hidden" name="type" value="graduate_sheet" />
          <button className="px-2 py-0.5 rounded bg-green-800/60 text-white text-[0.65rem] flex items-center space-x-1">
            <span>EXPORT</span>
            <PiMicrosoftExcelLogo className="h-4 w-4" />
          </button>
        </div>
      </Form>
      {/* University Staff  */}
      <Form
        action=""
        method="post"
        className="px-6 pb-4 grid md:grid-cols-6 gap-y-2 md:gap-y-0 place-items-center border-b border-slate-200 text-xs text-gray-400 font-sans font-semibold uppercase tracking-widest"
      >
        <div className="md:col-span-2 md:place-self-start text-sm">
          University Staff
        </div>
        <div className="p-2 md:col-span-3 md:place-self-start border rounded grid md:grid-cols-1 bg-white shadow-[0px_0px_4px_#ddd_inset]">
          <ReportDropdown
            label="CATEGORY"
            name="category"
            options={
              [ { label: 'All Staff', value: '' },
                // { label: 'Junior Staff', value: ''},
                // { label: 'Senior Staff', value: ''},
                { label: 'Academic Staff', value: 'ACADEMIC'},
                { label: 'Non-Academic Staff', value: 'NON_ACADEMIC'},
              ]
            }
          />
        </div>
        <div>
          <input type="hidden" name="type" value="staff" />
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
