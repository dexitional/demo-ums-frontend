import React from "react";
import { useLoaderData } from "react-router-dom";
import AISResultCard from "../../components/ais/AISResultCard";
import Service from "../../utils/aisService";

type Props = {};

export async function loader({ params }) {
  const data = await Service.fetchStudentTranscript(params.studentId);
  let credit = 0;
  let gradepoint = 0;
  const cgpa: any = [];
  data &&
    Array.from(data)?.map(([title, row]: any, i: number) => {
      credit += row.reduce((sum, cur) => cur.credit + sum, 0);
      gradepoint += row.reduce(
        (sum, cur) => cur.credit * cur.gradepoint + sum,
        0
      );
      let gpa = gradepoint / credit;
      cgpa.push(gpa.toFixed(2));
    });
  return { data, cgpa };
}

function PgAISStudentTranscript({}: Props) {
  const { data, cgpa }: any = useLoaderData();

  if (!data?.length)
    return (
      <div className="p-3 ">
        <h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">
          No Academic Statement ...
        </h1>
      </div>
    );
  return (
    <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-10 ">
      {data &&
        Array.from(data)?.map(([title, row]: any, i: number) => (
          <AISResultCard
            index={i}
            cgpa={cgpa}
            key={title}
            title={title.toUpperCase()}
            data={row}
          />
        ))}
      {/*(<div className="p-3 "><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Academic Statement ...</h1></div>)} */}
    </div>
  );
}

export default PgAISStudentTranscript;
