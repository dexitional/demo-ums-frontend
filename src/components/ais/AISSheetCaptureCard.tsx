import React, { useRef } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
const { REACT_APP_API_URL } = import.meta.env;

type Props = {
  data?: any;
  title?: string;
};

function AISSheetCaptureCard({ title, data }: Props) {
  const state = useActionData();
  const formRef: any = useRef();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const loading = navigation?.state;

  return (
    <Form method="post" className="w-full space-y-3 rounded">
      <h1 className="text-sm font-bold font-roboto tracking-wider text-primary-dark/60 flex flex-col md:flex-row justify-between">
        <span className="px-3 py-0.5 rounded border border-primary/50">
          SCORE CAPTURE SHEET
        </span>
        <div className="flex items-center space-x-2">
          <button
            disabled={loading === "submitting"}
            ref={formRef}
            type="submit"
            className="px-3 py-1 rounded border border-primary/70 text-xs text-primary/70 font-bold flex items-center"
          >
            {loading === "submitting" ? (
              <span className="animate-pulse">SAVING ...</span>
            ) : (
              " SAVE SHEET"
            )}
          </button>
          {/* <Link
            to="../scores"
            onClick={(e) => {
              if (confirm("Do you want to cancel?")) return false;
              e.preventDefault();
            }}
            className="px-3 py-1 rounded border border-primary-accent/70 text-xs text-primary-accent/70 font-bold flex items-center"
          >
            CANCEL
          </Link> */}
          <button
            disabled={loading === "submitting"}
            onClick={() => {
              if (confirm("Cancel")) navigate("../scores");
            }}
            className="py-1 px-4 rounded-md  bg-slate-50 border text-sm text-gray-600"
            type="button"
          >
            CANCEL
          </button>
        </div>
      </h1>
      <div className="w-full rounded-lg shadow-md text-xs overflow-x-scroll md:overflow-hidden">
        <div className="px-3 py-2 bg-primary/10 text-primary-dark/70 font-bold grid grid-cols-12 tracking-wider">
          <span>PHOTO</span>
          <span className="col-span-2">INDEX NUMBER</span>
          <span className="col-span-3">FULL NAME</span>
          <span>SCORE-A</span>
          <span>SCORE-B</span>
          <span>SCORE-C</span>
          <span>CLASS-T</span>
          <span>EXAMS-T</span>
          <span>TOTAL</span>
        </div>
        {data
          //?.filter((r: any) => r.status == 0)
          ?.map((row: any, i: number) => (
            <div className="px-3 py-2 border-b grid grid-cols-12 font-medium text-xs text-primary/80">
              <img
                crossOrigin="anonymous"
                src={`${REACT_APP_API_URL}/auth/photos/?tag=${row?.student?.id}`}
                className="h-8 w-8 border rounded-md bg-white object-contain"
              />
              <span className="col-span-2 font-bold flex items-center">
                {row?.indexno}
              </span>
              <span className="col-span-3 font-bold flex items-center">
                {(
                  row.student?.fname +
                  " " +
                  (row.student?.mname ? row.student?.mname + " " : "") +
                  row.student?.lname
                ).toUpperCase()}{" "}
              </span>
              <input
                name={`${i}_scorea`}
                onBlur={() => formRef.current.click()}
                defaultValue={row.scoreA}
                className="px-2 py-0.5 w-12 h-7 self-center rounded border border-primary/30 bg-primary/5 text-xs text-primary-dark font-bold"
              />
              <input
                name={`${i}_scoreb`}
                onBlur={() => formRef.current.click()}
                defaultValue={row.scoreB}
                className="px-2 py-0.5 w-12 h-6 self-center rounded border border-primary/30 bg-primary/5 text-xs text-primary-dark font-bold"
              />
              <input
                name={`${i}_scorec`}
                onBlur={() => formRef.current.click()}
                defaultValue={row.scoreC}
                className="px-2 py-0.5 w-12 h-6 self-center rounded border border-primary/30 bg-primary/5 text-xs text-primary-dark font-bold"
              />
              <input
                name={`${i}_class`}
                type="number"
                onBlur={() => formRef.current.click()}
                defaultValue={row.classScore}
                max={row.scheme?.scoreRange?.class}
                min={0}
                maxLength={2}
                className="px-2 py-0.5 w-14 h-6 self-center rounded border border-primary/30 bg-primary/5 text-xs text-primary-dark font-bold"
              />
              <input
                name={`${i}_exam`}
                type="number"
                onBlur={() => formRef.current.click()}
                defaultValue={row.examScore}
                max={row.scheme.scoreRange.exam}
                min={0}
                maxLength={2}
                className="px-2 py-0.5 w-14 h-6 self-center rounded border border-primary/30 bg-primary/5 text-xs text-primary-dark font-bold"
              />
              <div className="flex items-center justify-center font-bold italic text-sm text-gray-500">
                {row.examScore + row.classScore}
              </div>
              <input
                name={`${i}_idx`}
                defaultValue={row.indexno}
                type="hidden"
              />
              <input name={`${i}_id`} defaultValue={row.id} type="hidden" />
            </div>
          ))}
        {data?.filter((r: any) => r.status == 0).length == 0 ? (
          // <div className='p-6 text-center'>
          //    <span className="text-sm text-amber-800 italic">Score Capturing is disabled for this sheet!</span>
          // </div>
          <div className="m-6 mx-auto px-3 py-1 w-fit rounded border text-sm font-medium text-gray-400 tracking-wider bg-slate-50">
            Score Capturing is disabled for this sheet!
          </div>
        ) : null}

        <input type="hidden" name="count" defaultValue={data.length} />
        <input
          type="hidden"
          name="sid"
          defaultValue={data && data[0].sessionId}
        />
        <input
          type="hidden"
          name="cid"
          defaultValue={data && data[0].courseId}
        />
      </div>
    </Form>
  );
}

export default AISSheetCaptureCard;
