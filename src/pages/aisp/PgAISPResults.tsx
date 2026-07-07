import React from "react";
import { GrDocumentLocked } from "react-icons/gr";
import { useLoaderData } from "react-router-dom";
import ResultListView from "../../components/aisp/ResultListView";
import PageTitle from "../../components/las/PageTitle";
import Service from "../../utils/aisService";
import { useUserStore } from "../../utils/authService";

type Props = {};

export async function loader() {
  const user = useUserStore.getState().user;
  const data = await Service.fetchStudentTranscript(user?.user?.tag);
  const fees = await Service.fetchStudentFinance(user?.user?.tag);
  const student = await Service.fetchStudent(user?.user?.tag);

  let credit = 0;
  let gradepoint = 0;
  const cgpa: any = [];
  Array.from(data).map(([title, row]: any, i: number) => {
    credit += row?.filter((r:any) => !!r.status == true ).reduce((sum, cur) => cur.credit + sum, 0);
    gradepoint += row?.filter((r:any) => !!r.status == true ).reduce((sum, cur) => cur.credit * cur.gradepoint + sum,0);
    let gpa = gradepoint / credit;
    cgpa.push(gpa.toFixed(2));
  });

  return { data, cgpa, fees, student };
}

function PgAISPResults({}: Props) {
  const { data, cgpa, fees, student }: any = useLoaderData();
  const results = (data && Array.from(data)) || [];
  const sum = fees?.reduce((sum: any, cur: any) => cur.amount + sum, 0);

  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <div className="space-y-6">
        <PageTitle
          title="Results Statement"
          createtext=""
          createlink=""
          setView={() => null}
          view={""}
        />
        <div className="flex flex-col space-y-6">
          {/* If Student Not Owing */}
          {
          // sum <= 0 &&
            data &&
            Array.from(data).map(([title, row]: any, i: number) => (
              <ResultListView
                index={i}
                cgpa={cgpa}
                key={title}
                title={title.toUpperCase()}
                data={row}
              />
            ))}

          {/* If Student Owning */}
          {sum > 0 && !student?.flagPardon ? (
            <div className="px-4 py-4 md:pl-6 md:pr-10 md:py-6 md:w-fit border rounded-xl shadow flex ">
              <GrDocumentLocked className="hidden md:flex md:h-20 md:w-32 text-primary-dark" />
              <div className="flex flex-col">
                {/* <h2 className="text-base md:text-2xl font-roboto text-primary-dark uppercase">
                  Result viewing disabled
                </h2> */}
                <h3 className="text-sm md:text-lg font-roboto">
                  Sorry You have an accrued Debt of{" "}
                  <b>
                    {fees && fees[0]?.currency} {sum.toFixed(2) || 0}
                  </b>
                </h3>
                <p className="text-xs md:text-base italic font-roboto">
                  Please contact the <b>Finance office</b> to resolve any debt
                  related issues with your receipts.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {!data.length ? (
        <div className="p-3 h-16 md:h-28 bg-slate-50/50 border rounded-xl flex items-center justify-center font-semibold">
          <h1 className="w-full text-center text-gray-400 text-[0.65rem] font-semibold tracking-widest uppercase">
            No Academic Statement ...
          </h1>
        </div>
      ) : null}
    </div>
  );
}

export default PgAISPResults;
