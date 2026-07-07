import React from "react";
import { useLoaderData } from "react-router-dom";
import ResultListView from "../../components/aisp/ResultListView";
import PageTitle from "../../components/las/PageTitle";
import Service from "../../utils/aisService";
import { useUserStore } from "../../utils/authService";

type Props = {};

export async function loader() {
  const user = useUserStore.getState().user;
  const data = await Service.fetchStudentTranscript(user?.user?.tag);
  let credit = 0;
  let gradepoint = 0;
  const cgpa: any = [];
  Array.from(data).map(([title, row]: any, i: number) => {
    credit += row.reduce((sum, cur) => cur.credit + sum, 0);
    gradepoint += row.reduce(
      (sum, cur) => cur.credit * cur.gradepoint + sum,
      0
    );
    let gpa = gradepoint / credit;
    cgpa.push(gpa.toFixed(1));
  });

  return { data, cgpa };
}

function PgAISPResults({}: Props) {
  const { data, cgpa }: any = useLoaderData();
  const results = (data && Array.from(data)) || [];
  console.log(results);

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
        {data &&
          Array.from(data).map(([title, row]: any, i: number) => (
            <ResultListView
              index={i}
              cgpa={cgpa}
              key={title}
              title={title.toUpperCase()}
              data={row}
            />
          ))}
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
